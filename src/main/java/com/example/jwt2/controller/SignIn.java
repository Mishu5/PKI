package com.example.jwt2.controller;

import com.example.jwt2.Hasher;
import com.example.jwt2.SignInRequest;
import com.example.jwt2.SignUpRequest;
import com.example.jwt2.Token;
import com.example.jwt2.db.Role;
import com.example.jwt2.db.User;
import com.example.jwt2.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth/signin")
public class SignIn {

    @Autowired
    UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> SignUp(@RequestBody SignInRequest request){

        String password = Hasher.HashPassword(request.getPassword());
        User user = userRepository.findUserByEmail(request.getEmail());
        if(user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        }
        if(!user.getPassword().equals(password)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password is incorrect");
        }

        String jwt = Token.createJWT(user.getName(), user.getRole());

        return ResponseEntity.status(HttpStatus.OK).body(jwt);
    }

}
