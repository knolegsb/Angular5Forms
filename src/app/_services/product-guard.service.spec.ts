/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductGuardService } from './product-guard.service';

describe('Service: ProductGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductGuardService]
    });
  });

  it('should ...', inject([ProductGuardService], (service: ProductGuardService) => {
    expect(service).toBeTruthy();
  }));
});