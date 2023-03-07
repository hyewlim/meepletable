package com.project.meepletable.services;

import com.project.meepletable.models.Boardgame;
import com.project.meepletable.utils.XMLParser;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class BggService {


    public List<Boardgame> getGames(String name) {

        //https://boardgamegeek.com/xmlapi/search?search=Crossbows%20and%20Catapults

        final String BGG_API_URL = "https://boardgamegeek.com/xmlapi2/search";

        String url = UriComponentsBuilder.fromUriString(BGG_API_URL)
                .queryParam("query", name)
                .queryParam("type", "boardgame")
                .toUriString();

        return XMLParser.parseBoardgameListXML(url);

    }
}
