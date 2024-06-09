package com.example.jwt2;

import lombok.Getter;

@Getter
public class SignInRequest {
    private String password;
    private String email;

    public SignInRequest(String password, String email){
        this.password = password;
        this.email = email;
    }
}
