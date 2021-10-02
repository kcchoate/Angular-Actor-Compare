import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { MediaSelectorComponent } from './media-selector/media-selector.component';
import { CompareComponent } from './compare/compare.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { ActorDisplayComponent } from './actor-display/actor-display.component';
import { CompareDisplayComponent } from './compare-display/compare-display.component';
import { TvshowDisplayComponent } from './tvshow-display/tvshow-display.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    MovieDisplayComponent,
    CompareComponent,
    MediaSelectorComponent,
    ActorDisplayComponent,
    CompareDisplayComponent,
    TvshowDisplayComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
