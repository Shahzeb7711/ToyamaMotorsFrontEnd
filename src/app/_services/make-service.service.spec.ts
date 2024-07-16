import { TestBed } from '@angular/core/testing';

import { MakeServiceService } from './make-service.service';

describe('MakeServiceService', () => {
  let service: MakeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
