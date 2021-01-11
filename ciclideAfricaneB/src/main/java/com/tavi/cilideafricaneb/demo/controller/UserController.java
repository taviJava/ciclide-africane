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

    @PostMapping("/species")
    public void save(@RequestBody UserDto userDto){ userService.add(userDto); }
    @PutMapping("/species")
    public void update(@RequestBody UserDto userDto){
        userService.update(userDto);
    }
    @DeleteMapping("/species{id}")
    public void delete(@PathVariable(name = "id") long id){
        userService.delete(id);
    }
    @GetMapping("/species")
    public List<UserDto> getAll(){
        return userService.getAll();
    }
    @GetMapping("/species{id}")
    public UserDto getOne(@PathVariable(name = "id") long id){
        return userService.getOne(id);
    }
}
