import { TestBed } from '@angular/core/testing';

import { DownstreamBackendService } from './downstream-backend.service';

describe('DownstreamBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownstreamBackendService = TestBed.get(DownstreamBackendService);
    expect(service).toBeTruthy();
  });
});
