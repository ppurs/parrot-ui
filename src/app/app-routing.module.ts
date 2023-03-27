import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationsPageComponent } from './components/translations-page/translations-page/translations-page.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page/quiz-page.component';
import { AppGuard } from './auth/helpers/app-guard/app-guard.service';
import { LabelsPageComponent } from './components/labels-page/labels-page/labels-page.component';
import { Role } from './auth/models/role';
import { UsersPageComponent } from './components/users-page/users-page/users-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],                  
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent, 
      },
      {
        path: 'labels',
        canActivate: [AppGuard],    
        data: {
          roles: [Role.USER]
        },    
        component: LabelsPageComponent
      },
      {
        path: 'quiz',
        canActivate: [AppGuard],    
        data: {
          roles: [Role.USER]
        },    
        component: QuizPageComponent,
      },
      {
        path: 'translations',
        canActivate: [AppGuard],    
        data: {
          roles: [Role.USER]
        },    
        component: TranslationsPageComponent,   
      },
      {
        path: 'users',
        canActivate: [AppGuard],    
        data: {
          roles: [Role.ADMIN]
        },                   
        component: UsersPageComponent,
      },
      { path: '**', redirectTo: '' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
