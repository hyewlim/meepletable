import { Injectable } from '@angular/core';
import {Address} from "./models";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private markers: Address[] = [
    {name: "200 Turf Club Rd", latitude: 1.3379833, longitude: 103.7931053},
    {name: "261 Waterloo St", latitude: 1.2989163, longitude: 103.8519697},

  ]

  markersChanged = new Subject<Address[]>();

  constructor() { }

  addMarkers(address: Address) {
    this.markers.push(address);

  }

  getMarkers() {
    return this.markers.slice();
  }
}
