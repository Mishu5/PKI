package com.example.jwt2;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {
    // Getters
    private String name;
    private String password;
    private String email;

    // Constructor
    public SignUpRequest(String name, String password, String email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
}
