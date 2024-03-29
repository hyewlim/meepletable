import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {ChangePassword, JWTResponse, User} from "../../shared/models";
import {BehaviorSubject, catchError, lastValueFrom, Subject, tap, throwError} from "rxjs";
import {JWTTokenService} from "./jwt-token.service";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  signedInUser$ = new Subject<User>();

  userName$ = new BehaviorSubject<string>("");

  user!: User;

  constructor(private http: HttpClient,
              private jwtService: JWTTokenService) {


    const token = sessionStorage.getItem("jwt_token");
    this.isLoggedIn$.next(!!token);

    if (!!token){
      this.jwtService.setToken(token);
      this.userName$.next(<string>this.jwtService.getUser());
    }

  }

  registerNewUser(user: User) {
    return lastValueFrom(this.http.post("/api/v1/auth/register", user))
  }

  authUser(user: User) {
    return lastValueFrom(this.http.post<JWTResponse>('/api/v1/auth/authenticate', user)
      .pipe( tap((response: JWTResponse) => {
        sessionStorage.setItem("jwt_token", response.token)

        this.jwtService.setToken(response.token);

        const username = <string>this.jwtService.getUser()

        const newUser: User = {
          username: username,
          password: "",
          email: "",
          userId: response.userId
        }

        this.signedInUser$.next(newUser);
        this.userName$.next(username);
        this.user = newUser;
        sessionStorage.setItem("user", JSON.stringify(this.user));
        this.isLoggedIn$.next(true);

      })))
  }

  logOutUser() {
    sessionStorage.removeItem("jwt_token");
    sessionStorage.removeItem("user")
    this.isLoggedIn$.next(false);

  }

  sendResetPasswordEmail(email: string) {

    const params = new HttpParams()
      .append('email', email)

    return lastValueFrom(this.http.get("/api/v1/auth/resetPWEmail", {params: params}))
  }

  resetPassword(token: string, password: string){

    const params = new HttpParams()
      .append('token', token)
      .append('password', password)

    return lastValueFrom(this.http.get("/api/v1/auth/resetPW", {params: params}))


  }



  getUserIdObservable() {
    return this.signedInUser$.asObservable();
  }

  setUser(user: User) {
    this.signedInUser$.next(user);

  }


  changePassword(data: ChangePassword) {

    const params = new HttpParams()
      .append('newPassword', data.newPassword)

    return lastValueFrom(this.http.post("/api/v1/auth/changepassword", data, {params: params}))

  }
}
