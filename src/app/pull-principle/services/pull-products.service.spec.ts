import { TestBed } from '@angular/core/testing';

import { PullProductsService } from './pull-products.service';

describe('PullProductsService', () => {
  let service: PullProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PullProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
