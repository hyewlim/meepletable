import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./models";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  postNewUser(user: User) {
    return lastValueFrom(this.http.post("/api/user", user))
  }

  authUser(user: User) {
    return lastValueFrom(this.http.post('/api/user/auth', user))

  }


}
