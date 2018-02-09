import { Component, OnInit, OnDestroy } from "@angular/core";
import { IProduct } from "../../_interfaces/IProduct";
import { Subscription } from "rxjs/Subscription";
import { ProductService } from "../../_services/product.service";

@Component({
    selector: 'app-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Product Detail';

    product: IProduct | null;
    sub: Subscription;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.sub = this.productService.selectedProductChanges$.subscribe(
            selectedProduct => this.product = selectedProduct            
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}