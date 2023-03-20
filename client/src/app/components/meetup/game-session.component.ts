import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoogleMap} from "@angular/google-maps";
import {environment} from "../../../environments/environment.development";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GooglemapService} from "../../shared/googlemap.service";
import {Address} from "../../shared/models";
import {RepositoryService} from "../../shared/repository.service";

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
              private repositoryService: RepositoryService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      comment: this.fb.control<string>("")
    })

  }

  openSession() {
    this.sessionDialog = true;
  }

  hideDialog() {
    this.sessionDialog = false;
  }

  saveForm() {

    let sessionInfo = {
      address: this.chosenAddress,
      comment: this.form.value['comment']
    }
    console.log(sessionInfo)

    //save to markers[] , post to repository

    this.sessionDialog = false;
  }

  foundAddress(address: Address) {
    this.chosenAddress = address;
  }
}
