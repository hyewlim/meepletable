import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Boardgame, User} from "./models";
import {lastValueFrom, Subject} from "rxjs";
import {UserService} from "../components/user/user.service";
import {JWTTokenService} from "../components/user/jwt-token.service";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  boardgames = new Subject<Boardgame[]>()

  constructor(private http: HttpClient) { }

  saveBoardgames(boardgames: Boardgame[], userId: string) {

    const params = new HttpParams()
      .append("userId", userId)

    return lastValueFrom(this.http.post("/api/v1/games/collection", boardgames, {params: params}))
  }

  loadBoardgames(userId: string) {

    const params = new HttpParams()
      .append("userId", userId)

    return lastValueFrom(this.http.get<Boardgame[]>("/api/v1/games/collection", {params: params}))

  }

  deleteBoardgame(userId: string, bgId: number) {

    const params = new HttpParams()
      .append("userId", userId)
      .append("bgId", bgId)

    return lastValueFrom(this.http.delete("/api/v1/games/collection", {params: params}))

  }


}
