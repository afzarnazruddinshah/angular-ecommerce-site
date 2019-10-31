import { TestBed } from '@angular/core/testing';

import { UserfeaturesService } from './userfeatures.service';

describe('UserfeaturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserfeaturesService = TestBed.get(UserfeaturesService);
    expect(service).toBeTruthy();
  });
});
