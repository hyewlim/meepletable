import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LogInUser, User} from "./models";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  postNewUser(user: User) {
    return lastValueFrom(this.http.post("/api/user", user))
  }

  authUser(user: LogInUser) {
    return lastValueFrom(this.http.post('/api/user/auth', user))

  }


}
