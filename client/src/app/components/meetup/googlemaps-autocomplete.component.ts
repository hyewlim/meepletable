import {Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Address} from "../../shared/models";


@Component({
  selector: 'app-googlemaps-autocomplete',
  templateUrl: './googlemaps-autocomplete.component.html',
  styleUrls: ['./googlemaps-autocomplete.component.css']
})
export class GooglemapsAutocompleteComponent {

  @ViewChild('inputField')
  inputField!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;

  listener: any;

  @Output()
  chosenAddress = new EventEmitter<Address>();

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement, {
        componentRestrictions: {country: 'sg'}
      }
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
          const place = this.autocomplete?.getPlace();
        if (place?.geometry === undefined || place.geometry === null)
          return

        let addressToBeEmitted = <Address>{
          name: <string>place.name,
          position: {
            lat: <number>place.geometry.location?.lat(),
            lng: <number>place.geometry.location?.lng()
          }
        }

        this.chosenAddress.emit(addressToBeEmitted)

        }
      );
    });
  }

}
