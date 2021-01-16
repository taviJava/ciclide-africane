package com.tavi.cilideafricaneb.demo.controller;

import com.tavi.cilideafricaneb.demo.persistance.dto.SpeciesDto;
import com.tavi.cilideafricaneb.demo.persistance.dto.UserDto;
import com.tavi.cilideafricaneb.demo.repository.UserRepository;
import com.tavi.cilideafricaneb.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public void save(@RequestBody UserDto userDto){ userService.add(userDto); }
    @PutMapping("/users")
    public void update(@RequestBody UserDto userDto){
        userService.update(userDto);
    }
    @DeleteMapping("/users{id}")
    public void delete(@PathVariable(name = "id") long id){
        userService.delete(id);
    }
    @GetMapping("/users")
    public List<UserDto> getAll(){
        return userService.getAll();
    }
    @GetMapping("/users{id}")
    public UserDto getOne(@PathVariable(name = "id") long id){
        return userService.getOne(id);
    }
    @GetMapping("/users{email}")
    public UserDto getByEmail(@PathVariable(name = "email") String email){
        return userService.getByEmail(email);
    }
}
