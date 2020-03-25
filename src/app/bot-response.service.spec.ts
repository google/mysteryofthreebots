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

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as use from '@tensorflow-models/universal-sentence-encoder';

import { BotResponseService } from './bot-response.service';

describe('BotResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
  }));

  it('should be created', () => {
    const service: BotResponseService = TestBed.get(BotResponseService);
    expect(service).toBeTruthy();
  });

  describe('getResponse', () => {
    it('should return a matching query', inject(
      [
        HttpTestingController,
        BotResponseService,
      ],
      async (httpMock: HttpTestingController, service: BotResponseService) => {
        const loadPromise = service.loadModels();
        const matches = httpMock.match(() => true);
        const model = await use.load();
        const queryKey = JSON.stringify(['Who is there?']);
        const embedding = await model.embed(['Who is there?']);
        const embeddingArrays = await embedding.array();
        matches[0].flush({
          queryMap: {
            [queryKey]: {
              Response: 'Orange you glad I didn\'t say banana',
            },
          },
          embeddingMap: {
            [queryKey]: embeddingArrays[0],
          },
        });
        matches[1].flush({
          queryMap: {
          },
          embeddingMap: {
          },
        });
        matches[2].flush({
          queryMap: {
          },
          embeddingMap: {
          },
        });
        await loadPromise;
        const responsePromise = service.getResponse('Who\s there?', 'maid');
        const response = await responsePromise;
        expect(response).toBe('Orange you glad I didn\'t say banana');
        httpMock.verify();
      }));

    it('should return a query marked for any input', inject(
        [
          HttpTestingController,
          BotResponseService,
        ],
        async (httpMock: HttpTestingController, service: BotResponseService) => {
          const loadPromise = service.loadModels();
          const matches = httpMock.match(() => true);
          const queryKey = JSON.stringify([null]);
          matches[0].flush({
            queryMap: {
              [queryKey]: {
                Response: 'Anything goes!',
              },
            },
            embeddingMap: {
            },
          });
          matches[1].flush({
            queryMap: {
            },
            embeddingMap: {
            },
          });
          matches[2].flush({
            queryMap: {
            },
            embeddingMap: {
            },
          });
          await loadPromise;
          const responsePromise = service.getResponse('Who\s there?', 'maid');
          const response = await responsePromise;
          expect(response).toBe('Anything goes!');
          httpMock.verify();
        }));

    it('should check for state matching', inject(
        [
          HttpTestingController,
          BotResponseService,
        ],
        async (httpMock: HttpTestingController, service: BotResponseService) => {
          const loadPromise = service.loadModels();
          const matches = httpMock.match(() => true);
          const query = 'Can\'t you hear me knocking?';
          const state1 = 'some state';
          service.setState({
            maid: state1,
          });
          const response1 = 'On the window';
          const response2 = 'You\'re in a bad state';
          const queryKey1 = JSON.stringify([query, state1]);
          const queryKey2 = JSON.stringify([query]);
          const model = await use.load();
          const embedding = await model.embed([query]);
          const [embeddingArray] = await embedding.array();
          matches[0].flush({
            queryMap: {
              [queryKey1]: {
                Response: response1,
                State: state1,
              },
              [queryKey2]: {
                Response: response2,
              },
            },
            embeddingMap: {
              [queryKey1]: embeddingArray,
              [queryKey2]: embeddingArray,
            },
          });
          matches[1].flush({
            queryMap: {
            },
            embeddingMap: {
            },
          });
          matches[2].flush({
            queryMap: {
            },
            embeddingMap: {
            },
          });
          await loadPromise;
          const response = await service.getResponse('Can you hear me tapping?', 'maid');
          expect(response).toBe(response1);
          httpMock.verify();
        }));

    it('should change state on matched queries', inject(
      [
        HttpTestingController,
        BotResponseService,
      ],
      async (httpMock: HttpTestingController, service: BotResponseService) => {
        const loadPromise = service.loadModels();
        const matches = httpMock.match(() => true);
        const state = 'some state';
        const response = 'On the window';
        const queryKey = JSON.stringify([null]);
        matches[0].flush({
          queryMap: {
            [queryKey]: {
              Response: response,
              NewState: state,
            },
          },
          embeddingMap: {
          },
        });
        matches[1].flush({
          queryMap: {
          },
          embeddingMap: {
          },
        });
        matches[2].flush({
          queryMap: {
          },
          embeddingMap: {
          },
        });
        await loadPromise;
        await service.getResponse('Can you hear me tapping?', 'maid');
        expect(service.getState('maid')).toBe(state);
        httpMock.verify();
      }));
    });
});
