package com.tavi.cilideafricaneb.demo.controller;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.tavi.cilideafricaneb.demo.persistance.dto.SpeciesDto;
import com.tavi.cilideafricaneb.demo.persistance.dto.UserDto;
import com.tavi.cilideafricaneb.demo.repository.UserRepository;
import com.tavi.cilideafricaneb.demo.security.AuthTokenData;
import com.tavi.cilideafricaneb.demo.security.TokenProvider;
import com.tavi.cilideafricaneb.demo.security.UserDetailService;
import com.tavi.cilideafricaneb.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenProvider jwtTokenUtil;

    @PostMapping("/register")
    public void save(@RequestBody UserDto userDto){ userService.register(userDto); }
    @PostMapping("/login")
    public ResponseEntity generateToken(@RequestBody UserDto userDto) throws AuthenticationException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDto.getEmail(),
                        userDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenUtil.generateToken(authentication);
        System.out.println(token);
        return ResponseEntity.ok(new AuthTokenData(token));
    }
    @PutMapping("/users")
    public void update(@RequestBody UserDto userDto){
        userService.update(userDto);
    }
    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable(name = "id") long id){
        userService.delete(id);
    }
    @GetMapping("/users")
    public List<UserDto> getAll(){
        return userService.getAll();
    }
    @GetMapping("/users/{email}")
    public UserDto getByEmail(@PathVariable(name = "email") String email){
        return userService.getByEmail(email);
    }
    @GetMapping("/userbyid/{id}")
    public UserDto getById(@PathVariable(name = "id") long id){
        return userService.getOne(id);
    }
}
