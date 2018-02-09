import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { IProduct } from '../../_interfaces/IProduct';
import { ProductService } from '../../_services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { NumberValidator } from '../../_validators/number.validator';
import { GenericValidator } from '../../_validators/generic.validator';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle: string = 'Product Edit';
  productForm: FormGroup;

  product: IProduct;
  errorMessage: string;
  displayMessage: {[key: string]: string} = {};
  
  private sub: Subscription;
  private validationMessages: { [key: string]: {[key: string]: string} };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { 
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50)
                    ]],
      productCode: ['', ],
      starRating: [''],
      tags: this.fb.array([]),
      description: ''
    });

    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getProduct(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessage(this.productForm);
      });
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe(
        (product: IProduct) => this.onProductRetrieved(product),
        (error: any) => this.errorMessage = <any>error
      );
  }

  onProductRetrieved(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  saveProduct(): void {
    if (this.productForm.dirty && this.productForm.valid) {
      let p = Object.assign({}, this.product, this.productForm.value);

      this.productService.saveProduct(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }    
  }

  onSaveComplete(): void {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }
}
