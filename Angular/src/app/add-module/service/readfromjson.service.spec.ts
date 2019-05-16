import { TestBed } from '@angular/core/testing';

import { ReadfromjsonService } from './readfromjson.service';

describe('ReadfromjsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadfromjsonService = TestBed.get(ReadfromjsonService);
    expect(service).toBeTruthy();
  });
});
