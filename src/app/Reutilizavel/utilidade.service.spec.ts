import { TestBed } from '@angular/core/testing';

import { UtilidadeService } from './utilidade.service';

describe('UtilidadeService', () => {
  let service: UtilidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
