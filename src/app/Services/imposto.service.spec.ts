import { TestBed } from '@angular/core/testing';

import { ImpostoService } from './imposto.service';

describe('ImpostoService', () => {
  let service: ImpostoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpostoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
