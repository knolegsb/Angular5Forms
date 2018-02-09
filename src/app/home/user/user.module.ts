import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserComponent } from "./user.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../_services/auth.service";
import { AuthGuardService } from "../../_services/auth-guard.service";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: UserComponent}
        ]),
        CommonModule,
        FormsModule
    ],
    declarations: [
        UserComponent
    ],
    providers: [
        AuthService,
        AuthGuardService
    ]
})
export class UserModule { }