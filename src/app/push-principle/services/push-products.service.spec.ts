import { TestBed } from '@angular/core/testing';

import { PushProductsService } from './push-products.service';

describe('PushProductsService', () => {
  let service: PushProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
