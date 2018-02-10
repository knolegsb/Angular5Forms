import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { IProduct } from '../../_interfaces/IProduct';
import { ProductParameterService } from '../../_services/product-parameter.service';
import { ProductCriteriaComponent } from '../product-criteria/product-criteria.component';
import { IPagination, PaginatedResult } from '../../_interfaces/IPagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  listFilter: string;
  errorMessage: string;

  includeDetail: boolean = true;

  filteredProducts: IProduct[];
  products: IProduct[];

  p: number = 1;
  total: number = 15;

  pagination: IPagination;
  @ViewChild(ProductCriteriaComponent) filterComponent: ProductCriteriaComponent;
  
  constructor(private productService: ProductService,
    private productParameterService: ProductParameterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.productService.getProducts(this.pagination.currentPage = 3, this.pagination.itemsPerPage = 5)
    //   //.subscribe(products => this.products = products,
    //   //          error => this.errorMessage = <any>error
    //     .subscribe((res: PaginatedResult<IProduct[]>) => {
    //       this.products = res.result;
    //       this.pagination = res.pagination;
    //     })
    //   ;

    //this.loadProducts();

    // this.route.data.subscribe(data => {
    //   //this.pagination = data['products'].pagination;
    //   console.log(data);
    // })

    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.filterComponent.listFilter = this.productParameterService.filterBy;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  // loadProducts() {
  //   this.productService.getProducts(this.pagination.currentPage = 3, this.pagination.itemsPerPage = 5)
  //     //.subscribe(products => this.products = products,
  //     //          error => this.errorMessage = <any>error
  //       .subscribe((res: PaginatedResult<IProduct[]>) => {
  //         this.products = res.result;
  //         this.pagination = res.pagination;
  //       });
  // }

  onValueChange(value: string): void {
    this.productParameterService.filterBy = value;
    this.performFilter(value);
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    }
    else {
      this.filteredProducts = this.products;
    }
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  // pageChanged(event: any): void {
  //   this.pagination.currentPage = event.page;
  //   this.loadProducts();
  // }
}
