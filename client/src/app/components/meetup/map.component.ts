import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {catchError, map, Observable, of, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {Address} from "../../shared/models";
import {MapService} from "../../shared/map.service";

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

  markers = []
  infoContent = ''


  initialCoordinates = {
    lat: 1.322914,
    lng: 103.839112,
  }

  markersSub$!: Subscription;


  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {

    const latlng = { lat: 1.3379833, lng: 103.7931053}

    // @ts-ignore
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: latlng,
      zoom: 12,
    })

    const marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
    });
    // @ts-ignore
    this.markers.push(marker1);

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
  infoWindow!: MapInfoWindow;



  openInfo(marker: MapMarker, windowIndex: number) {

    this.info.open(marker);
  }
}
