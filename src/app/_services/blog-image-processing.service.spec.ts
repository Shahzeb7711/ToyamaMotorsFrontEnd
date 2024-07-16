import { TestBed } from '@angular/core/testing';

import { BlogImageProcessingService } from './blog-image-processing.service';

describe('BlogImageProcessingService', () => {
  let service: BlogImageProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogImageProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
