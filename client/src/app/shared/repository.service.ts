import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Boardgame, User} from "./models";
import {lastValueFrom, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  boardgames = new Subject<Boardgame[]>()

  constructor(private http: HttpClient) { }

  saveBoardgames(boardgames: Boardgame[]) {
    return lastValueFrom(this.http.post("/api/games/post", boardgames))
  }


}
