import { TestBed } from '@angular/core/testing';

import { BlogResolveService } from './blog-resolve.service';

describe('BlogResolveService', () => {
  let service: BlogResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
