import { TestBed } from '@angular/core/testing';

import { CommonCategoriesService } from './common-categories.service';

describe('CommonCategoriesService', () => {
  let service: CommonCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
