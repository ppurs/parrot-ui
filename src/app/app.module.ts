import { AddTranslationsComponent } from './components/translations-page/add-translations/add-translations.component';
import { AppComponent } from './app.component';
import { DeleteConfirmationComponent } from './components/tiles/delete-confirmation/delete-confirmation.component';
import { FilterTileComponent } from './components/tiles/filter-tile/filter-tile.component';
import { FoundTranslationTileComponent } from './components/tiles/translation-tile/found-translation-tile/found-translation-tile.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewTranslationTileComponent } from './components/tiles/translation-tile/new-translation-tile/new-translation-tile.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { QuizTileComponent } from './components/tiles/quiz-tile/quiz-tile.component';
//import { QuizPageComponent } from './components/quiz-page/quiz-page.component';

@NgModule({
  declarations: [
    AddTranslationsComponent,
    AppComponent,
    DeleteConfirmationComponent,
    FilterTileComponent,
    FoundTranslationTileComponent,
    MainLayoutComponent,
    MainPageComponent,
    NavbarComponent,
    NewTranslationTileComponent,
    StatusInfoComponent,
    TileActionsBarComponent,
    TranslationsFilterFormComponent,
    TranslationsPageComponent,
    //QuizTileComponent,
    //QuizPageComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
    NgbModule,
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
