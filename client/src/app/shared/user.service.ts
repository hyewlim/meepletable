import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "./models";
import {BehaviorSubject, catchError, lastValueFrom, Subject, tap, throwError} from "rxjs";
import {JWTTokenService} from "./jwt-token.service";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  isLoggedIn$ = new BehaviorSubject<boolean>(false)

  signedInUser = new Subject<User>()

  userName$ = new BehaviorSubject<string>("");

  user!: User;

  constructor(private http: HttpClient,
              private jwtService: JWTTokenService) {

    const token = localStorage.getItem("jwt_token");
    this.isLoggedIn$.next(!!token);

    if (!!token){
      this.jwtService.setToken(token);
      this.userName$.next(<string>this.jwtService.getUser());
    }

  }

  postNewUser(user: User) {
    return lastValueFrom(this.http.post("/api/user", user))
  }

  authUser(user: User) {
    return lastValueFrom(this.http.post('/api/v1/auth/authenticate', user)
      .pipe( tap((response) => {
        // @ts-ignore
        localStorage.setItem("jwt_token", response['token']);
        // @ts-ignore
        this.jwtService.setToken(response['token']);
        this.userName$.next(<string>this.jwtService.getUser());
        this.isLoggedIn$.next(true);

      })))
  }

  logOutUser() {
    localStorage.removeItem("jwt_token");
    this.isLoggedIn$.next(false);

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
