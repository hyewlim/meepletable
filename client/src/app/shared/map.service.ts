import { Injectable } from '@angular/core';
import {Address, GameSession} from "./models";
import {lastValueFrom, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../components/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  markers: GameSession[] = []

  markersChanged = new Subject<GameSession[]>();

  constructor(private http: HttpClient,
              private userService: UserService) { }

  addMarkers(session: GameSession) {

    this.markers.push(session)
    this.markersChanged.next(this.markers);


    return lastValueFrom(this.http.post("/api/session" + "/" + this.userService.user.userId, session))




  }

  loadMarkers() {
    return lastValueFrom(this.http.get<GameSession[]>("/api/session"));
  }

  getMarkers() {
    return this.markers.slice();
  }
}
