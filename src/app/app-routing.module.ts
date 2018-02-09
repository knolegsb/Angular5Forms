import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupComponent } from "./home/signup/signup.component";
import { PageNotFoundComponent } from "./home/page-not-found/page-not-found.component";
import { ShellComponent } from "./home/shell/shell.component";

const appRoutes : Routes = [

    {   path: '', 
        component: ShellComponent,
        children: [
            { path: 'welcome', component: SignupComponent },
            { path: 'products', loadChildren: './products/product.module#ProductModule'},
            { path: 'login', loadChildren: './home/user/user.module#UserModule'},
            { path: '', redirectTo: 'welcome', pathMatch: 'full' }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}