import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { HomeComponent } from './components/home.component';
import { SearchComponent } from './components/search.component';
import { MapComponent } from './components/map.component';
import { HeaderComponent } from './components/header.component';
import { CollectionComponent } from './components/collection.component';



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

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    AppRoutingModule,

  ],
  exports: [
    MapComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
