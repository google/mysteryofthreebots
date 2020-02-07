import { TestBed } from '@angular/core/testing';

import { BotResponseService } from './bot-response.service';

describe('BotResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotResponseService = TestBed.get(BotResponseService);
    expect(service).toBeTruthy();
  });
});
