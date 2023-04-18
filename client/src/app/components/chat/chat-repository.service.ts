import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Boardgame, ChatMessage} from "../../shared/models";

@Injectable({
  providedIn: 'root'
})
export class ChatRepositoryService {

  constructor(private http: HttpClient) { }

  loadChatLog(sessionId: string) {

    const params = new HttpParams()
      .append("id", sessionId)

    return lastValueFrom(this.http.get<ChatMessage[]>("/api/chat/messages", {params: params}))

  }

}
