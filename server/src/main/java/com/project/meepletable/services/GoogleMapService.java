package com.project.meepletable.services;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GoogleMapService {

    public void getCoordinates(String address) {

// https://maps.googleapis.com/maps/api/place/autocomplete/json
// ?key=AIzaSyArhQ2zZuRa7-QwSBIWs6L2SLQjEsx6QII&input=26 jalan berseh&language=en&types=geocode

        final String GMAP_API = "https://maps.googleapis.com/maps/api/place/autocomplete/json";

        final String G_API_KEY = "AIzaSyArhQ2zZuRa7-QwSBIWs6L2SLQjEsx6QII";

        String url = UriComponentsBuilder.fromUriString(GMAP_API)
                .queryParam("key", G_API_KEY)
                .queryParam("input", address)
                .queryParam("language", "en")
                .queryParam("types", "geocode")
                .queryParam("components", "country:sg")
                .toUriString();

        RequestEntity<Void> request = RequestEntity.get(url).build();

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> response = template.exchange(request, String.class);
        String payload = response.getBody();
        System.out.println(payload);



    }

}
