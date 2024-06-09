package com.example.jwt2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("resource/public")
public class PublicRes {

    @GetMapping
    public ResponseEntity<String> getResource(){
        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }

}
