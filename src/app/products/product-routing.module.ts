import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductListComponent } from "./product-list/product-list.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductDetailGuard, ProductEditGuard } from "../_services/product-guard.service";
import { ProductShellComponent } from "./product-shell/product-shell.component";

const productRoutes : Routes = [
    {   path: '', component: ProductListComponent },
    {   path: 'shell', component: ProductShellComponent },
    {   path: ':id', 
        //canActivate: [ ProductDetailGuard ],
        component: ProductDetailComponent 
    },
    {
        path: ':id/edit', 
        //canActivate: [ ProductEditGuard ],
        component: ProductEditComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(productRoutes)
    ],
    exports: [ RouterModule ]
})
export class ProductRoutingModule {

}