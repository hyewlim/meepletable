import {Component, OnInit} from '@angular/core';
import { io } from 'socket.io-client';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  greetings: string[] = [];
  disabled = true;
  newmessage!: string;
  private stompClient = null;

  constructor(){}

  ngOnInit() {
    this.connect();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('/testchat');
    // @ts-ignore
    this.stompClient = Stomp.over(socket);

    const _this = this;

    // @ts-ignore
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      // @ts-ignore
      _this.stompClient.subscribe('/start/initial', function (hello) {
        console.log(JSON.parse(hello.body));

        _this.showMessage(JSON.parse(hello.body));
      });
    });
  }

  sendMessage() {

    // @ts-ignore
    this.stompClient.send(
      '/current/resume',
      {},
      JSON.stringify(this.newmessage)
    );
    this.newmessage = "";

  }

  showMessage(message: string) {

    this.greetings.push(message);

  }

}
