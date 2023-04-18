import {Component, ElementRef, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {GoogleMap} from "@angular/google-maps";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Address, Boardgame, GameSession, User} from "../../shared/models";
import {RepositoryService} from "../../shared/repository.service";
import {UserService} from "../user/user.service";
import {MeetupService} from "../../shared/meetup.service";
import {Subscription} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class GameSessionComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  sessionDialog: boolean = false;

  sessionDetailDialog: boolean = false;

  chatRoomDialog: boolean = false;

  map!: GoogleMap;

  chosenAddress!: Address;

  sessions: GameSession[] = [];

  session!: GameSession;

  sessionsSub$!: Subscription;

  minDate!: Date;

  userName!: string;

  @Output()
  idOutput!: string;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  iconImage = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

  playerCount: any[] = [
    { name: '2' , value: 2},
    { name: '3-4' , value: 4},
    { name: '5-6' , value: 6},
    { name: '>6' , value: 7},
  ];


  constructor(private fb: FormBuilder,
              private repositoryService: RepositoryService,
              private userService: UserService,
              private meetupService: MeetupService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router
              ) {

  }

  ngOnInit(): void {
    this.form = this.createSessionForm();

    this.meetupService.loadSessions();

    this.sessionsSub$ = this.meetupService.meetupsChanged.subscribe(
      data => {
        this.sessions = data;
      }
    )

    //calender min date
    this.minDate = new Date();

    this.userService.userName$.subscribe(
      value => {
        this.userName = value;
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

  openSessionDetail(session: GameSession) {
    this.session = {...session};
    this.sessionDetailDialog = true;
  }

  hideDialog() {
    this.sessionDialog = false;
    this.sessionDetailDialog = false;
  }

  addSession() {

    let participants: User[] = [];

    let sessionInfo: GameSession = {
      id: "",
      title: this.form.value['title'],
      host: this.userService.user.username,
      address: this.chosenAddress,
      date: this.form.value['date'],
      playerCount: this.form.value['playerCount'],
      comment: this.form.value['comment'],
      icon: this.iconImage,
      participants: participants
    }

    this.meetupService.meetups.push(sessionInfo);
    this.meetupService.meetupsChanged.next(this.meetupService.meetups.slice());

    this.meetupService.addMeetup(sessionInfo).then( value => {
      this.messageService.add({severity: "success", summary: "Successful", detail: "Session Added", life:3000})

      }
    );

    this.sessionDialog = false;
  }

  foundAddress(address: Address) {
    this.chosenAddress = address;
  }


  joinSession(session: GameSession) {
    const existingUser = session.participants.find(
      user => user.userId === this.userService.user.userId)

    if (existingUser){
      this.messageService.add({
        severity: "error",
        summary: "Unable to add",
        detail: "You have already signed up for this session", life:3000})
    } else if (session.participants.length === session.playerCount) {
      this.messageService.add({
        severity: "error",
        summary: "Unable to add",
        detail: "The maximum number of players have been reached", life:3000})
    } else {
      session.participants.push(this.userService.user);
      this.meetupService.addMeetup(session);
      this.messageService.add({
        severity: "success",
        summary: "Successful",
        detail: "You have signed up for this session", life:3000})
    }



  }

  removeSession(session: GameSession) {

    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + session.title + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.sessions = this.sessions.filter(val => val.id !== session.id);
        this.session = {} as GameSession;
        this.messageService.add({severity: "success", summary: "Successful", detail: "Session Deleted", life:3000})
        this.meetupService.deleteMeetup(session.id)
          .then(value => {
            this.meetupService.meetupsChanged.next(this.sessions)
          })

      }
    });


  }

  ngOnDestroy(): void {

    this.sessionsSub$.unsubscribe();
  }

  toChat() {
    this.router.navigate(['chat'])
  }

  openChatRoom(sessionId: string) {
    this.chatRoomDialog = true;
    this.idOutput = sessionId;
  }
}
