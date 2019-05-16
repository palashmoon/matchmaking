import { TestBed } from '@angular/core/testing';

import { BasicInfoService } from './basic-info.service';

describe('BasicInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicInfoService = TestBed.get(BasicInfoService);
    expect(service).toBeTruthy();
  });
});
