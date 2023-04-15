import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {catchError, map, Observable, of, Subscription} from "rxjs";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {Address, GameSession} from "../../shared/models";
import {MeetupService} from "../../shared/meetup.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild(GoogleMap, { static: false })
  map!: google.maps.Map;
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;

  markers: GameSession[] = []
  infoContent = ''

  markersSub$!: Subscription;

  iconImage = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

  initialCoordinates = {
    lat: 1.322914,
    lng: 103.839112,
  }

  constructor(private meetupService: MeetupService) {
  }

  ngOnInit(): void {

    this.markersSub$ = this.meetupService.meetupsChanged.subscribe(
      data => {
        this.markers = data;
        console.log(...this.markers.values())
      }
    )

  }

  click(event: google.maps.MapMouseEvent) {
    console.log(event)
  }

  openInfo(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker)
  }


}
