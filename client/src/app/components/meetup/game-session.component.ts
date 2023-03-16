import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GoogleMap} from "@angular/google-maps";
import {environment} from "../../../environments/environment.development";

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent {
  sessionDialog: boolean = false;
  map!: GoogleMap;

  @ViewChild('search')
  public searchElementRef!: ElementRef;



  openSession() {
    this.sessionDialog = true;

    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchElementRef.nativeElement
    )
  }

  hideDialog() {

  }

  saveProduct() {

  }

  //https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyArhQ2zZuRa7-QwSBIWs6L2SLQjEsx6QII&input=26 jalan berseh&language=en&types=geocode
  // search for place



}
