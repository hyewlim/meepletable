package com.project.meepletable.services;

import com.project.meepletable.models.Boardgame;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class BgaService {

    public List<Boardgame> getGames(String name) {

        //https://api.boardgameatlas.com/api/search?name=Catan&client_id=JLBr5npPhV

        final String BGA_API_URL = "https://api.boardgameatlas.com/api/search";

        String url = UriComponentsBuilder.fromUriString(BGA_API_URL)
                .queryParam("name", name)
                .queryParam("client_id", "JLBr5npPhV")
                .toUriString();

        RequestEntity<Void> request = RequestEntity.get(url).build();

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> response = template.exchange(request, String.class);
        String payload = response.getBody();

        System.out.println(payload);

        return null;

    }

}
