import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GooglemapService {

  constructor(private http: HttpClient) { }

  GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

  //https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyArhQ2zZuRa7-QwSBIWs6L2SLQjEsx6QII&address=26 jalan berseh

  getGeoCode(address: string) {

    const params = new HttpParams()
      .append('key', environment.googleAPIKey)
      .append("address", address)

    return lastValueFrom(this.http.get(this.GEOCODE_URL, {params: params}))
  }

}
