import { AddLabelsComponent } from './components/labels-page/add-labels/add-labels.component';
import { AddTranslationsComponent } from './components/translations-page/add-translations/add-translations.component';
import { AppComponent } from './app.component';
import { ConfirmationDialogComponent } from './components/users-page/confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from './components/translations-page/translation-tile/delete-confirmation/delete-confirmation.component';
import { DeleteLabelConfirmationComponent } from './components/labels-page/label-tile/delete-label-confirmation/delete-label-confirmation.component';
import { ErrorDetailsDialogContentComponent } from './components/shared/error-details-dialog-content/error-details-dialog-content.component';
import { ErrorToastComponent } from './components/shared/error-toast/error-toast.component';
import { FilterTileComponent } from './components/shared/filter-tile/filter-tile.component';
import { FoundLabelTileComponent } from './components/labels-page/label-tile/found-label-tile/found-label-tile.component';
import { FoundTranslationTileComponent } from './components/translations-page/translation-tile/found-translation-tile/found-translation-tile.component';
import { LabelsFilterFormComponent } from './components/labels-page/labels-filter-form/labels-filter-form.component';
import { LabelsPageComponent } from './components/labels-page/labels-page/labels-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewLabelTileComponent } from './components/labels-page/label-tile/new-label-tile/new-label-tile.component';
import { NewTranslationTileComponent } from './components/translations-page/translation-tile/new-translation-tile/new-translation-tile.component';
import { QuizFilterFormComponent } from './components/quiz-page/quiz-filter-form/quiz-filter-form.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page/quiz-page.component';
import { QuizTileComponent } from './components/quiz-page/quiz-tile/quiz-tile.component';
import { SnackBarContentComponent } from './components/labels-page/snack-bar-content/snack-bar-content.component';
import { StatusInfoComponent } from './components/shared/status-info/status-info.component';
import { TileActionsBarComponent } from './components/shared/tile-actions-bar/tile-actions-bar.component';
import { TranslationsFilterFormComponent } from './components/translations-page/translations-filter-form/translations-filter-form.component';
import { TranslationsPageComponent } from './components/translations-page/translations-page//translations-page.component';
import { UsersFilterFormComponent } from './components/users-page/users-filter-form/users-filter-form.component';
import { UsersPageComponent } from './components/users-page/users-page/users-page.component';
import { UserTileComponent } from './components/users-page/user-tile/user-tile.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxColorsModule } from 'ngx-colors';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorInterceptor } from './error-interceptor';
import { DefaultOptionsInterceptor } from './default-options-interceptor';


@NgModule({
  declarations: [
    AddLabelsComponent,
    AddTranslationsComponent,
    AppComponent,
    ConfirmationDialogComponent,
    DeleteConfirmationComponent,
    DeleteLabelConfirmationComponent,
    ErrorDetailsDialogContentComponent,
    ErrorToastComponent,
    FilterTileComponent,
    FoundLabelTileComponent,
    FoundTranslationTileComponent,
    LabelsFilterFormComponent,
    LabelsPageComponent,
    MainLayoutComponent,
    MainPageComponent,
    NavbarComponent,
    NewLabelTileComponent,
    NewTranslationTileComponent,
    QuizFilterFormComponent,
    QuizPageComponent,
    QuizTileComponent,
    SnackBarContentComponent,
    SnackBarContentComponent,
    StatusInfoComponent,
    TileActionsBarComponent,
    TranslationsFilterFormComponent,
    TranslationsPageComponent,
    UsersFilterFormComponent,
    UsersPageComponent,
    UserTileComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,   
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
    NgbModule,
    NgxColorsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultOptionsInterceptor,
      multi: true
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
