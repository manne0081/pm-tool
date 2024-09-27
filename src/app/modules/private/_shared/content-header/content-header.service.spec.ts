import { TestBed } from '@angular/core/testing';

import { ContentHeaderService } from './content-header.service';

describe('ContentHeaderService', () => {
  let service: ContentHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
