import { TestBed } from '@angular/core/testing';

import { CommoncontactService } from './commoncontact.service';

describe('CommoncontactService', () => {
  let service: CommoncontactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommoncontactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
