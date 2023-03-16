import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoogleMap} from "@angular/google-maps";
import {environment} from "../../../environments/environment.development";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GooglemapService} from "../../shared/googlemap.service";

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit {

  form!: FormGroup;

  sessionDialog: boolean = false;
  map!: GoogleMap;

  text!: string;

  results!: string[];

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(private fb: FormBuilder,
              private gMapService: GooglemapService) {
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      address: this.fb.control<string>("")
    })
    }

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





  submitForm() {

    this.gMapService.getGeoCode(this.form.value['address'])
      .then(data => {
        console.log(data)
      })
  }

  searchGeocode(event: any) {

    this.gMapService.getGeoCode(event.query)
      .then(data => {
        console.log(data)
      })


  }
}
