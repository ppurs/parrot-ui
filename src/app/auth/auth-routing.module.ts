import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegistrationFormComponent } from "./components/registration-form/registration-form.component";
import { AuthGuard } from "./helpers/auth-guard/auth-guard.service";

const routes: Routes = [
    {
      path: 'login', component: LoginFormComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'register', component: RegistrationFormComponent,
      canActivate: [AuthGuard]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule { }