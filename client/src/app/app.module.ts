import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import { SignupComponent } from './components/user/signup.component';
import { PageNotFoundComponent } from './components/error/page-not-found.component';
import { HomeComponent } from './components/home.component';
import { SearchComponent } from './components/search.component';
import { MapComponent } from './components/map.component';
import { HeaderComponent } from './components/header.component';
import { CollectionComponent } from './components/collection.component';
import { SigninComponent } from './components/user/signin.component';

import {ButtonModule} from 'primeng/button';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AutocompleteComponent } from './components/autocomplete.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {RatingModule} from "primeng/rating";


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PageNotFoundComponent,
    HomeComponent,
    SearchComponent,
    MapComponent,
    HeaderComponent,
    CollectionComponent,
    SigninComponent,
    AutocompleteComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    BrowserAnimationsModule,
    CardModule,
    TableModule,
    ToolbarModule,
    FileUploadModule,
    RatingModule

  ],
  exports: [
    MapComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
