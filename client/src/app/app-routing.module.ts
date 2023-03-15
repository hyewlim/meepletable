import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home.component";
import {SignupComponent} from "./components/user/signup.component";
import {MapComponent} from "./components/meetup/map.component";
import {PageNotFoundComponent} from "./components/error/page-not-found.component";
import { CollectionComponent } from './components/game-collection/collection.component';
import {SigninComponent} from "./components/user/signin.component";
import {MeetupComponent} from "./components/meetup/meetup.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'collection', component: CollectionComponent},
  { path: 'map', component: MapComponent},
  { path: 'meetup', component: MeetupComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
