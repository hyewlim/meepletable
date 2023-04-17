import {Component, OnDestroy, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {Subscription} from "rxjs";
import {CalEvent, GameSession} from "../../shared/models";
import {MeetupService} from "../../shared/meetup.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy{

  constructor(private meetupService: MeetupService) {
  }

  sessionsSub$!: Subscription;
  events: CalEvent[] = [];
  sessions: GameSession[] = []

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 900,
    plugins: [dayGridPlugin]
  };

ngOnInit(): void {

  this.sessions = this.meetupService.meetups;

  this.events = this.sessions.map(
    (gs: GameSession) => ({
      title: gs.title,
      date: gs.date
    }),
  )

  this.sessionsSub$ = this.meetupService.meetupsChanged.subscribe((gameSessions: GameSession[]) => {
    this.events = gameSessions.map((gameSession: GameSession) => ({
      title: gameSession.title,
      date: gameSession.date,
    }));
  });

}

ngOnDestroy(): void {
  this.sessionsSub$.unsubscribe();
}





}
