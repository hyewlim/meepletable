import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {lastValueFrom, Subject} from "rxjs";
import {Boardgame} from "./models";

@Injectable({
  providedIn: 'root'
})
export class BglookupService {


  constructor(private http: HttpClient) { }

  getResults(query: any) {
    const params = new HttpParams()
      .append('name', query)

    return lastValueFrom(this.http.get<Boardgame[]>('/api/game', {params: params}))
  }
}
