/**
Copyright 2020 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

const modelPromise = window.use.load();
const modelPromisesByBotName = {};

const MINIMUM_SCORE = 0.68;

function dot(data1, data2) {
  let sum = 0;
  for (let i = 0; i < data1.length; i++) {
      sum += data1[i] * data2[i];
  }
  return sum;
}

async function loadModel(botName) {
  const response = await fetch(`/models/${botName}.model.json`)
  if (!response.ok || response.status > 299) {
    throw new Error(`Failed to get model data for ${botName}`);
  }
  const {queryMap, embeddingMap} = await response.json();
  return {queryMap, embeddingMap};
}

function loadModels() {
  return Promise.all(['maid', 'chef', 'butler'].map((botName) => {
    const promise = loadModel(botName);
    modelPromisesByBotName[botName] = promise;
    return promise;
  }));
}

async function getResponse(query, botName) {
  const {queryMap, embeddingMap} = await modelPromisesByBotName[botName];
  const model = await modelPromise;
  const queryEmbedding = await model.embed([query]);
  const queryArr = await queryEmbedding.arraySync()[0];
  let maxScore = -Infinity;
  let bestMatch;
  for (const potentialMatch of Object.keys(embeddingMap)) {
    const score = dot(queryArr, embeddingMap[potentialMatch]);
    if (score > maxScore) {
      maxScore = score;
      bestMatch = potentialMatch;
    }
  }

  console.info('Best match: "' + bestMatch + '" with score ' + maxScore);
  if (bestMatch === undefined || maxScore < MINIMUM_SCORE) {
    if (maxScore < MINIMUM_SCORE) {
      console.info('Ignoring match because its score is below the threshhold of ' + MINIMUM_SCORE);
    }
    return undefined;
  }
  return queryMap[bestMatch];
}

export {loadModels};
export {getResponse};
