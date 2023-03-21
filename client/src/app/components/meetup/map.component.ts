import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {catchError, map, Observable, of, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {Address, GameSession} from "../../shared/models";
import {MapService} from "../../shared/map.service";
import InfoWindow = google.maps.InfoWindow;

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


  marker1 = {
    position: {lat: 1.3379833, lng: 103.7931053},
    icon: this.iconImage,
    title: "200 Cross Street",
    description: "this is for fun"

  }




  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {

    this.markersSub$ = this.mapService.markersChanged.subscribe(
      data => {
        this.markers = data;
      }
    )



  }


  click(event: google.maps.MapMouseEvent) {
    console.log(event)
  }




  // addMarker() {
  //   // @ts-ignore
  //   this.markers.push({
  //     position: {
  //       lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
  //       lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
  //     },
  //     label: {
  //       color: 'red',
  //       text: 'Marker label ' + (this.markers.length + 1),
  //     },
  //     title: 'Marker title ' + (this.markers.length + 1),
  //     options: { animation: google.maps.Animation.BOUNCE },
  //   });
  // }


  openInfo(marker: MapMarker) {
    // @ts-ignore
    this.info.open(marker);
  }


}
