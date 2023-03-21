import { Injectable } from '@angular/core';
import {Address, GameSession} from "./models";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  markers = []

  // private markers: Address[] = [
  //   {name: "200 Turf Club Rd", latitude: 1.3379833, longitude: 103.7931053},
  //   {name: "261 Waterloo St", latitude: 1.2989163, longitude: 103.8519697},
  //
  // ]

  iconImage = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

  markersChanged = new Subject<Address[]>();

  constructor() { }

  addMarkers(session: GameSession) {

    // @ts-ignore
    this.markers.push({
      position: {
        lat: session.address.latitude,
        lng: session.address.longitude
      },
      title: session.address.name,
      icon: this.iconImage,
      host: session.host,
      comment: session.comment,
      playerCount: session.playerCount,
      date: session.date
    });

  }

  getMarkers() {
    return this.markers.slice();
  }
}
