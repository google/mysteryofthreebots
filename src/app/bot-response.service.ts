/**
 *  Copyright 2020 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Injectable } from '@angular/core';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { HttpClient } from '@angular/common/http';

function dot(data1: number[], data2: number[]) {
  let sum = 0;
  for (let i = 0; i < data1.length; i++) {
      sum += data1[i] * data2[i];
  }
  return sum;
}

export type BotName = 'maid'|'butler'|'chef';

interface IModelFetchResult {
  queryMap: {[query: string]: string};
  embeddingMap: {[query: string]: number[]};
}

@Injectable({
  providedIn: 'root'
})
export class BotResponseService {
  private readonly modelPromise = use.load();
  private readonly modelPromisesByBotName = {};
  private loadModelsPromise?: Promise<IModelFetchResult[]>;
  private minimumScore = 0.6;
  private readonly statesByBotName: {
    [botName: string]: string|null;
  } = {
    maid: null,
    butler: null,
    chef: null,
  };

  constructor(private http: HttpClient) { }

  private async loadModel(botName: BotName) {
    return this.http
      .get<IModelFetchResult>(`assets/models/${botName}.model.json`)
      .toPromise();
  }

  loadModels() {
    if (!this.loadModelsPromise) {
      this.loadModelsPromise = Promise.all(['maid', 'chef', 'butler'].map((botName: BotName) => {
        const promise = this.loadModel(botName);
        this.modelPromisesByBotName[botName] = promise;
        return promise;
      }));
    }
    return this.loadModelsPromise;
  }

  setState({maid, butler, chef}: {maid?: string|null, butler?: string|null, chef?: string|null}) {
    if (maid !== undefined) {
      this.statesByBotName.maid = maid;
    }
    if (butler !== undefined) {
      this.statesByBotName.butler = butler;
    }
    if (chef !== undefined) {
      this.statesByBotName.chef = chef;
    }
  }

  getState(botName: BotName) {
    return this.statesByBotName[botName];
  }

  /**
   * Gets a bot's response to a player's question.
   *
   * @param query the player's question
   * @param botName the name of the bot ('maid', 'butler' or 'chef')
   */
  async getResponse(query: string, botName: string) {
    botName = botName.toLowerCase() as BotName;
    // queryMap maps a JSON-encoded array consisting of candidate query string
    // and state (if any) to response information. If no state is associated with
    // the query, the array is one element long. For example:
    //    '["Where is the diamond?","state1"]' => "I don't know where the diamond is",
    //    '["Who was at dinner?"] => "All the guests were there"
    // A null query represents a response that can apply to any query, but takes lower
    // precedence than a non-null query.

    // embeddingMap is a map from candidate query to the precomputed USE
    // representation array
    const {queryMap, embeddingMap} = await this.modelPromisesByBotName[botName];
    const model = await this.modelPromise;
    // Calculate the USE representation of the player's query
    const queryEmbedding = await model.embed([query]);
    const queryArrays = await queryEmbedding.array();
    let maxScore = -Infinity;
    let bestMatch: string|undefined;
    for (const potentialMatch of Object.keys(embeddingMap)) {
      // Calculate a similarity score by taking the dot product of the player's
      // encoded query with the encoded candidate query
      const score = dot(queryArrays[0], embeddingMap[potentialMatch]);
      if (score > maxScore) {
        maxScore = score;
        bestMatch = potentialMatch;
      }
    }

    // tslint:disable-next-line: no-console
    console.info('Best match: "' + bestMatch + '" with score ' + maxScore);
    if (bestMatch === undefined || maxScore < this.minimumScore) {
      if (maxScore < this.minimumScore) {
        // tslint:disable-next-line: no-console
        console.info('Ignoring match because its score is below the threshhold of ' + this.minimumScore);
      }
      let queryKeyPair = [null];
      let match: {
        NewState?: string;
        Response: string;
      };
      // found a match--need to check if the states match
      if (bestMatch) {
        queryKeyPair = [bestMatch];

        // If the bot currently has a state associated with it, incorporate
        // that in the search
        if (this.statesByBotName[botName]) {
          queryKeyPair.push(this.statesByBotName[botName]);
        }
        match = queryMap[JSON.stringify(queryKeyPair)];
        if (match) {
          // Update the state if there's a new state declared
          if (match.NewState) {
            this.statesByBotName[botName] = match.NewState;
          }
          return match.Response;
        }
      }
      // No match found--check if there's a query set to match any input
      queryKeyPair[0] = null;
      if (this.statesByBotName[botName]) {
        // Incorporate the bot's state, if any
        queryKeyPair.push(this.statesByBotName[botName]);
      }
      match = queryMap[JSON.stringify(queryKeyPair)];
      if (match) {
        if (match.NewState) {
          this.statesByBotName[botName] = match.NewState;
        }
        return match.Response;
      }
      return undefined;
    }
    return queryMap[bestMatch].Response;
  }
}
