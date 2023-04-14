import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoogleMap} from "@angular/google-maps";
import {environment} from "../../../environments/environment.development";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GooglemapService} from "../../shared/googlemap.service";
import {Address, GameSession} from "../../shared/models";
import {RepositoryService} from "../../shared/repository.service";
import {UserService} from "../user/user.service";
import {MapService} from "../../shared/map.service";
import {Subscription} from "rxjs";
import {SelectItem} from "primeng/api";

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

  sessions: GameSession[] = [];

  sessionSub$!: Subscription;


  @ViewChild('search')
  public searchElementRef!: ElementRef;

  iconImage = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"


  constructor(private fb: FormBuilder,
              private repositoryService: RepositoryService,
              private userService: UserService,
              private mapService: MapService) {
  }

  ngOnInit(): void {
    this.form = this.createSessionForm();

    this.mapService.loadMarkers().then(
      data => {
        this.sessions = data
        this.mapService.markersChanged.next(data)
      }
    )


  }

  private createSessionForm(): FormGroup {
    return this.fb.group({
      title: this.fb.control<string>(""),
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
      title: this.form.value['title'],
      host: this.userService.user.username,
      address: this.chosenAddress,
      date: this.form.value['date'],
      playerCount: this.form.value['playerCount'],
      comment: this.form.value['comment'],
      icon: this.iconImage
    }
    console.log(sessionInfo)

    //save to markers[] , post to repository
    this.mapService.addMarkers(sessionInfo);
    this.sessions.push(sessionInfo);

    this.sessionDialog = false;
  }

  foundAddress(address: Address) {
    this.chosenAddress = address;
  }


}
