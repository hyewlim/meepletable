package com.project.meepletable.controllers;

import com.project.meepletable.services.GoogleMapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/map")
public class MapController {

    @Autowired
    private GoogleMapService gMapSvc;

    @GetMapping
    public ResponseEntity<String> getCoordinates(@RequestParam String address) {
        gMapSvc.getCoordinates(address);

        return null;
    }

}
