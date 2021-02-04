package com.tavi.cilideafricaneb.demo.controller;

import com.tavi.cilideafricaneb.demo.persistance.dto.ContactDto;
import com.tavi.cilideafricaneb.demo.persistance.dto.LinkDto;
import com.tavi.cilideafricaneb.demo.service.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class LinkController {
    @Autowired
    private LinkService linkService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admlink")
    public void save(@RequestBody LinkDto linkDto) {
        linkService.save(linkDto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admlink/{id}")
    public void delete(@PathVariable(name = "id") long id) {
        linkService.delete(id);
    }

    @GetMapping("/link")
    public List<LinkDto> getAll() {
        return linkService.getAll();
    }
}
