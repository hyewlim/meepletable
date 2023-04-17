import {Component, OnInit} from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  socket = io('http://localhost:8081/socket').;


  ngOnInit(): void {
    this.socket.on('connect', function() {
      console.log('Connected to server!');
      // this.socket.send('Hello, server!');
    });

    this.socket.on('message', function(message) {
      console.log('Received message from server:', message);
    });

  }

}
