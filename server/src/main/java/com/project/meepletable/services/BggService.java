package com.project.meepletable.services;

import com.project.meepletable.models.Boardgame;
import com.project.meepletable.utils.XMLParser;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class BggService {


    public List<Boardgame> getGames(String name) {

        //https://boardgamegeek.com/xmlapi2/search?query=gloom&type=boardgame

        final String BGG_API_URL = "https://boardgamegeek.com/xmlapi2/search";

        String url = UriComponentsBuilder.fromUriString(BGG_API_URL)
                .queryParam("query", name)
                .queryParam("type", "boardgame")
                .toUriString();

        return XMLParser.parseBoardgameListXML(url);

    }

    public Boardgame getGameDetail(int id) {

        //https://boardgamegeek.com/xmlapi2/thing?id=30549

        final String BGG_API_URL = "https://boardgamegeek.com/xmlapi2/thing";

        String url = UriComponentsBuilder.fromUriString(BGG_API_URL)
                .queryParam("id", id)
                .toUriString();

        return XMLParser.parseBgDetails(url);

    }
}
