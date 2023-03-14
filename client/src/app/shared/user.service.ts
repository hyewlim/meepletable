import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./models";
import {lastValueFrom, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  signedInUser = new Subject<User>()

  user!: User;

  constructor(private http: HttpClient) { }

  postNewUser(user: User) {
    return lastValueFrom(this.http.post("/api/user", user))
  }

  authUser(user: User) {
    return lastValueFrom(this.http.post('/api/user/auth', user))
  }

  getUserIdObservable() {
    return this.signedInUser.asObservable();
  }

  setUser(user: User) {
    this.signedInUser.next(user);
    // below is bugged
    this.user = user;
  }




}
