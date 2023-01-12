import { AddLabelsComponent } from './components/labels-page/add-labels/add-labels.component';
import { AddTranslationsComponent } from './components/translations-page/add-translations/add-translations.component';
import { AppComponent } from './app.component';
import { DeleteConfirmationComponent } from './components/tiles/delete-confirmation/delete-confirmation.component';
import { FilterTileComponent } from './components/tiles/filter-tile/filter-tile.component';
import { FoundLabelTileComponent } from './components/tiles/label-tile/found-label-tile/found-label-tile.component';
import { FoundTranslationTileComponent } from './components/tiles/translation-tile/found-translation-tile/found-translation-tile.component';
import { LabelsFilterFormComponent } from './components/forms/labels-filter-form/labels-filter-form.component';
import { LabelsPageComponent } from './components/labels-page/labels-page/labels-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewLabelTileComponent } from './components/tiles/label-tile/new-label-tile/new-label-tile.component';
import { NewTranslationTileComponent } from './components/tiles/translation-tile/new-translation-tile/new-translation-tile.component';
import { QuizFilterFormComponent } from './components/forms/quiz-filter-form/quiz-filter-form.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { QuizTileComponent } from './components/tiles/quiz-tile/quiz-tile.component';
import { StatusInfoComponent } from './components/tiles/status-info/status-info.component';
import { TileActionsBarComponent } from './components/tiles/tile-actions-bar/tile-actions-bar.component';
import { TranslationsFilterFormComponent } from './components/forms/translations-filter-form/translations-filter-form.component';
import { TranslationsPageComponent } from './components/translations-page/translations-page//translations-page.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxColorsModule } from 'ngx-colors';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SnackBarContentComponent } from './components/labels-page/snack-bar-content/snack-bar-content.component';

@NgModule({
  declarations: [
    AddLabelsComponent,
    AddTranslationsComponent,
    AppComponent,
    DeleteConfirmationComponent,
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
    StatusInfoComponent,
    TileActionsBarComponent,
    TranslationsFilterFormComponent,
    TranslationsPageComponent,
    SnackBarContentComponent
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
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,   
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
