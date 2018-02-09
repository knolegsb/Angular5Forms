/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductParameterService } from './product-parameter.service';

describe('Service: ProductParameter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductParameterService]
    });
  });

  it('should ...', inject([ProductParameterService], (service: ProductParameterService) => {
    expect(service).toBeTruthy();
  }));
});