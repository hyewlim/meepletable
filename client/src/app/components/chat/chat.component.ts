import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { io } from 'socket.io-client';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {UserService} from "../user/user.service";
import {Subscription} from "rxjs";
import {ChatMessage} from "../../shared/models";
import {ChatRepositoryService} from "./chat-repository.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnDestroy{
  messageLog: ChatMessage[] = [];
  disabled = true;
  newMessage!: string;
  private stompClient = null;
  username!: string;
  usernameSub$ !: Subscription;

  jwtHeader = {
    Authorization: 'Bearer ' + sessionStorage.getItem("jwt_token")
  }

  @Input()
  sessionId!: string;

  constructor(private userService: UserService,
              private chatService: ChatRepositoryService){}

  ngOnInit() {

    this.usernameSub$ = this.userService.userName$.subscribe(
      value => {
        this.username = value;
      }
    )

    this.chatService.loadChatLog(this.sessionId).then(
      data => {
        this.messageLog = data;
        console.log(this.messageLog);

      }
    )

    this.connect();

  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.messageLog = [];
    }
  }

  connect() {
    const socket = new SockJS('/meeplechat');

    // @ts-ignore
    this.stompClient = Stomp.over(socket);

    // @ts-ignore
    this.stompClient.connect(this.jwtHeader, this.onConnected());
  }

  onConnected() {
    //connect to start topic
    // @ts-ignore
    this.stompClient.subscribe('/start/topic');
    //tell your username to server
    // @ts-ignore
    this.stompClient.send("/current/chat.register", this.jwtHeader, JSON.stringify({sender: this.username, type: 'JOIN'}))

  }

  sendMessage() {

    var messageContent = this.newMessage.trim();

    if (messageContent && this.stompClient){
      var chatMessage: ChatMessage = {
        sender: this.username,
        content: messageContent,
        sessionId: this.sessionId,
        time: Date.now(),
        type: 0
      };

      this.messageLog.push(chatMessage);

      // @ts-ignore
      this.stompClient.send("/current/chat.send", {}, JSON.stringify(chatMessage));

      console.log("CHAT LOG", this.messageLog)
      this.newMessage = '';

    }
  }

  ngOnDestroy(): void {

    // @ts-ignore
    this.stompClient.unsubscribe
  }


}
