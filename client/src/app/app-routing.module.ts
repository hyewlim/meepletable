import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home.component";
import {SignupComponent} from "./components/user/signup.component";
import {MapComponent} from "./components/meetup/map.component";
import {PageNotFoundComponent} from "./components/error/page-not-found.component";
import { CollectionComponent } from './components/game-collection/collection.component';
import {SigninComponent} from "./components/user/signin.component";
import {MeetupComponent} from "./components/meetup/meetup.component";
import {ForgetPasswordComponent} from "./components/user/forget-password.component";
import {ResetPasswordComponent} from "./components/user/reset-password.component";
import {CalendarComponent} from "./components/calendar/calendar.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'forget', component: ForgetPasswordComponent, children: [
      {path: ':email', component: ResetPasswordComponent}
    ]},
  { path: 'collection', component: CollectionComponent},
  { path: 'map', component: MapComponent},
  { path: 'meetup', component: MeetupComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
