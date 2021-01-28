package com.tavi.cilideafricaneb.demo.controller;

import com.tavi.cilideafricaneb.demo.persistance.dto.HomePageDto;
import com.tavi.cilideafricaneb.demo.service.HomePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class HomePageController {
    @Autowired
    private HomePageService homePageService;

    @PostMapping("/homepage")
    public void save(@RequestBody HomePageDto homePageDto) {
        homePageService.save(homePageDto);
    }

    @GetMapping("/homepage")
    public List<HomePageDto> getAll() {
        return homePageService.getAll();
    }

    @GetMapping("/homepage/{id}")
    public HomePageDto getById(@PathVariable(name = "id") long id) {
        return homePageService.getById(id);

    }

    @PutMapping("/homepage/{id}")
    public void update(@RequestBody HomePageDto homePageDto) {
        homePageService.update(homePageDto);
    }

    @DeleteMapping("/homepage/{id}")
    public void delete(@PathVariable(name = "id") Long id) {
        homePageService.delete(id);

    }
}
