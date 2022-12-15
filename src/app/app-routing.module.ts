import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTranslationsPageComponent } from './components/add-translations-page/add-translations-page.component';

const routes: Routes = [
  {
    path: '',                       
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent   
      },
      {
        path: 'add',
        component: AddTranslationsPageComponent   
      }
    ]
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegistrationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
