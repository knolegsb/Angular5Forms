import { IProduct } from "../../_interfaces/IProduct";
import { OnInit, Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ProductService } from "../../_services/product.service";

@Component({
    selector: 'app-product-shell-list',
    templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Products';
    errorMessage: string;
    products: IProduct[];
    selectedProduct: IProduct | null;
    sub: Subscription;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.sub = this.productService.selectedProductChanges$.subscribe(
            selectedProduct => this.selectedProduct = selectedProduct
        );

        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }
    
    onSelected(product: IProduct): void {
        this.productService.changeSelectedProduct(product);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}