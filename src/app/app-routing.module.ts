import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationsPageComponent } from './components/translations-page/translations-page/translations-page.component';
//import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { AppGuard } from './auth/helpers/app-guard/app-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],                       
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent   
      },
      {
        path: 'translations',
        component: TranslationsPageComponent,   
      }/*, 
      {
        path: 'quiz',
        component: QuizPageComponent,
      }*/,
      { path: '**', redirectTo: '' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
