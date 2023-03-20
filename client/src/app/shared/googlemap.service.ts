import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GooglemapService {

  constructor(private http: HttpClient) { }

  GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

  PLACE_AUTOCOMPLETE_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json"

  //https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyArhQ2zZuRa7-QwSBIWs6L2SLQjEsx6QII&address=26 jalan berseh

  //https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyArhQ2zZuRa7-QwSBIWs6L2SLQjEsx6QII&input=26 jalan berseh&language=en&types=geocode


  getGeoCode(address: string) {

    // const params = new HttpParams()
    //   .append('key', environment.googleAPIKey)
    //   .append("address", address)
    //
    // return lastValueFrom(this.http.get(this.GEOCODE_URL, {params: params}))

    const params = new HttpParams()
      .append("key", environment.googleAPIKey)
      .append("input", address)
      .append("language", "en")
      .append("types", "geocode")
      .append("components", "country:sg")

    // const headers = new HttpHeaders()
    //   .append("Access-Control-Allow-Origin", "*")

    return lastValueFrom(this.http.get(this.PLACE_AUTOCOMPLETE_URL, {params: params}))
  }

}
