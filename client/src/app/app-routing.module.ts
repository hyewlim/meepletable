import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home.component";
import {SignupComponent} from "./components/user/signup.component";
import {MapComponent} from "./components/map.component";
import {PageNotFoundComponent} from "./components/error/page-not-found.component";
import { CollectionComponent } from './components/collection.component';
import {SigninComponent} from "./components/user/signin.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'collection', component: CollectionComponent},
  { path: 'map', component: MapComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
