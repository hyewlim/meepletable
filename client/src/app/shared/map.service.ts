import { Injectable } from '@angular/core';
import {Address, GameSession} from "./models";
import {lastValueFrom, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  markers: GameSession[] = []

  // private markers: Address[] = [
  //   {name: "200 Turf Club Rd", latitude: 1.3379833, longitude: 103.7931053},
  //   {name: "261 Waterloo St", latitude: 1.2989163, longitude: 103.8519697},
  //
  // ]

  markersChanged = new Subject<GameSession[]>();

  constructor(private http: HttpClient,
              private userService: UserService) { }

  addMarkers(session: GameSession) {

    this.markers.push(session)
    this.markersChanged.next(this.markers);


    return lastValueFrom(this.http.post("/api/session" + "/" + this.userService.user.userId, session))




  }

  getMarkers() {
    return this.markers.slice();
  }
}
