import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import { SignupComponent } from './components/user/signup.component';
import { PageNotFoundComponent } from './components/error/page-not-found.component';
import { HomeComponent } from './components/home.component';
import { MapComponent } from './components/meetup/map.component';
import { HeaderComponent } from './components/header.component';
import { CollectionComponent } from './components/game-collection/collection.component';
import { SigninComponent } from './components/user/signin.component';
import { AutocompleteComponent } from './components/game-collection/autocomplete.component';
import { MeetupComponent } from './components/meetup/meetup.component';
import { GameSessionComponent } from './components/meetup/game-session.component';
import { GooglemapsAutocompleteComponent } from './components/meetup/googlemaps-autocomplete.component';
import {AuthInterceptor} from "./auth.interceptor";
import { ForgetPasswordComponent } from './components/user/forget-password.component';
import { ResetPasswordComponent } from './components/user/reset-password.component';

import {ButtonModule} from 'primeng/button';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {RatingModule} from "primeng/rating";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RippleModule} from "primeng/ripple";
import {CheckboxModule} from "primeng/checkbox";
import {StyleClassModule} from "primeng/styleclass";
import {DividerModule} from "primeng/divider";
import {GMapModule} from "primeng/gmap";
import {DropdownModule} from "primeng/dropdown";
import {SplitButtonModule} from "primeng/splitbutton";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DataViewLayoutOptions, DataViewModule} from "primeng/dataview";



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PageNotFoundComponent,
    HomeComponent,
    MapComponent,
    HeaderComponent,
    CollectionComponent,
    SigninComponent,
    AutocompleteComponent,
    MeetupComponent,
    GameSessionComponent,
    GooglemapsAutocompleteComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,

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
    RatingModule,
    DialogModule,
    ConfirmDialogModule,
    RippleModule,
    CheckboxModule,
    StyleClassModule,
    DividerModule,
    GMapModule,
    GoogleMapsModule,
    DropdownModule,
    SplitButtonModule,
    InputTextModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    InputTextareaModule,
    DataViewModule

  ],
  exports: [
    MapComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
