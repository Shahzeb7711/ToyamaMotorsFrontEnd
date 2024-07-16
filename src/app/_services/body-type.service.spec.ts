import { TestBed } from '@angular/core/testing';

import { BodyTypeService } from './body-type.service';

describe('BodyTypeService', () => {
  let service: BodyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
