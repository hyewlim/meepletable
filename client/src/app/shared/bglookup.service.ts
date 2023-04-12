import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {lastValueFrom, Subject} from "rxjs";
import {Boardgame} from "./models";
import {JWTTokenService} from "../components/user/jwt-token.service";

@Injectable({
  providedIn: 'root'
})
export class BglookupService {


  constructor(private http: HttpClient,
              private jwtTokenSvc: JWTTokenService) { }

  getSearchResults(query: any) {
    const params = new HttpParams()
      .append('name', query)

    // const header =
    //   new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + this.jwtTokenSvc.jwtToken
    //   })

    return lastValueFrom(this.http.get<Boardgame[]>('/api/v1/games', {params: params}))
  }

  getGameDetails(query: number) {

    // http://localhost:8081/api/game/30549

    return lastValueFrom(this.http.get<Boardgame>('/api/v1/game/' + query))

  }
}
