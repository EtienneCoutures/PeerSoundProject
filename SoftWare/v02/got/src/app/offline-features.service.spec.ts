import { TestBed, inject } from '@angular/core/testing';

import { OfflineFeaturesService } from './offline-features.service';

describe('OfflineFeaturesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfflineFeaturesService]
    });
  });

  it('should be created', inject([OfflineFeaturesService], (service: OfflineFeaturesService) => {
    expect(service).toBeTruthy();
  }));
});
