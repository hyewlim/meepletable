import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup.component';
import {RouterModule, Routes} from "@angular/router";
import { PageNotFoundComponent } from './components/page-not-found.component';
import { HomeComponent } from './components/home.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './components/search.component';
import { MapComponent } from './components/map.component';
import {GoogleMapsModule} from "@angular/google-maps";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'map', component: MapComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'},
];


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PageNotFoundComponent,
    HomeComponent,
    SearchComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientJsonpModule
  ],
  exports: [
    MapComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
