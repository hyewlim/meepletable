import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Boardgame, User} from "./models";
import {lastValueFrom, Subject} from "rxjs";
import {UserService} from "../components/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  boardgames = new Subject<Boardgame[]>()

  constructor(private http: HttpClient,
              private userService: UserService) { }

  saveBoardgames(boardgames: Boardgame[], userId: number) {

    const params = new HttpParams()
      .append("userId", userId)


    return lastValueFrom(this.http.post("/api/games/collection", boardgames, {params: params}))
  }

  loadBoardgames(userId: number) {

    const params = new HttpParams()
      .append("userId", userId)

    return lastValueFrom(this.http.get<Boardgame[]>("/api/games/collection", {params: params}))

  }

  deleteBoardgame(userId: number, bgId: number) {

    const params = new HttpParams()
      .append("userId", userId)
      .append("bgId", bgId)

    return lastValueFrom(this.http.delete("/api/games/collection", {params: params}))

  }


}
