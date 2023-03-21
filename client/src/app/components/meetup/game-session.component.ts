import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoogleMap} from "@angular/google-maps";
import {environment} from "../../../environments/environment.development";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GooglemapService} from "../../shared/googlemap.service";
import {Address, GameSession} from "../../shared/models";
import {RepositoryService} from "../../shared/repository.service";
import {UserService} from "../../shared/user.service";
import {MapService} from "../../shared/map.service";

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

  chosenAddress!: Address;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(private fb: FormBuilder,
              private repositoryService: RepositoryService,
              private userService: UserService,
              private mapService: MapService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      comment: this.fb.control<string>(""),
      playerCount: this.fb.control<number>(2),
      date: this.fb.control(new Date())
    })

  }

  openSession() {
    this.sessionDialog = true;
  }

  hideDialog() {
    this.sessionDialog = false;
  }

  saveForm() {

    let sessionInfo: GameSession = {
      host: this.userService.user.username,
      address: this.chosenAddress,
      date: this.form.value['date'],
      playerCount: this.form.value['playerCount'],
      comment: this.form.value['comment']
    }
    console.log(sessionInfo)

    //save to markers[] , post to repository
    this.mapService.addMarkers(sessionInfo)

    this.sessionDialog = false;
  }

  foundAddress(address: Address) {
    this.chosenAddress = address;
  }
}
