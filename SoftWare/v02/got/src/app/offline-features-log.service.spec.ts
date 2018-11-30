import { TestBed, inject } from '@angular/core/testing';

import { OfflineFeaturesLogService } from './offline-features-log.service';

describe('OfflineFeaturesLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfflineFeaturesLogService]
    });
  });

  it('should be created', inject([OfflineFeaturesLogService], (service: OfflineFeaturesLogService) => {
    expect(service).toBeTruthy();
  }));
});
