import { NgModule } from "@angular/core";
import { ProductData } from "../_services/product-data";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductService } from "../_services/product.service";

import { ProductListComponent } from '../products/product-list/product-list.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { ProductEditComponent } from '../products/product-edit/product-edit.component';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { StarComponent } from "../star/star.component";
import { ProductFilterPipe } from "../_pipes/product-filter.pipe";
import { ProductEditGuard, ProductDetailGuard } from "../_services/product-guard.service";
import { ProductShellComponent } from "./product-shell/product-shell.component";
import { ProductShellListComponent } from "./product-shell/product-shell-list.component";
import { ProductShellDetailComponent } from "./product-shell/product-shell-detail.component";
import { ProductCriteriaComponent } from './product-criteria/product-criteria.component';
import { ProductParameterService } from "../_services/product-parameter.service";
import { PaginationModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        ReactiveFormsModule,
        HttpModule,
        FormsModule,
        CommonModule,
        InMemoryWebApiModule.forRoot(ProductData, {dataEncapsulation: true}),
        ProductRoutingModule,
        PaginationModule.forRoot(),
        NgxPaginationModule
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductEditComponent,
        StarComponent,
        ProductFilterPipe,
        ProductShellComponent,
        ProductShellListComponent,
        ProductShellDetailComponent
,
    ProductCriteriaComponent
],
    providers: [
        ProductService,
        ProductDetailGuard,
        ProductEditGuard,
        ProductParameterService
    ]
})
export class ProductModule {}