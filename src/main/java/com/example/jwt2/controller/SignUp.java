package com.example.jwt2.controller;

import com.example.jwt2.Hasher;
import com.example.jwt2.SignUpRequest;
import com.example.jwt2.db.Role;
import com.example.jwt2.db.User;
import com.example.jwt2.repositories.UserRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth/signup")
public class SignUp {

    @Autowired
    UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ApiResponse> SignUp(@RequestBody SignUpRequest request){
        User newUser = new User().withEmail(request.getEmail()).withName(request.getName()).withPassword(Hasher.HashPassword(request.getPassword())).withRole(Role.USER);
        newUser = userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("Created", newUser.getId()));
    }

}

@Getter
class ApiResponse {
    private String message;
    private Long userId;

    public ApiResponse(String message, Long userId){
        this.message = message;
        this.userId = userId;
    }
}