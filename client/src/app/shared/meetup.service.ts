import { Injectable } from '@angular/core';
import {Address, GameSession} from "./models";
import {AsyncSubject, BehaviorSubject, lastValueFrom, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserService} from "../components/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  meetups: GameSession[] = []

  meetupsChanged = new Subject<GameSession[]>();

  constructor(private http: HttpClient,
              private userService: UserService) {

  }

  addMeetup(session: GameSession) {
    return lastValueFrom(this.http.post("/api/v1/session" + "/" + this.userService.user.userId, session))
  }

  deleteMeetup(id: string) {

    const params = new HttpParams()
      .append("id", id)

    return lastValueFrom(this.http.delete("/api/v1/session", {params: params}))

  }

  loadSessions() {
    return lastValueFrom(this.http.get<GameSession[]>("/api/v1/session"))
      .then( result => {
        this.meetups = result;
        this.meetupsChanged.next(result)
        })
      .catch(error => {
        console.error(error)
      })
  }

  getMarkers() {
    return this.meetups.slice();
  }
}
