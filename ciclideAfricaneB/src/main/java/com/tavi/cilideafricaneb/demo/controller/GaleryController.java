package com.tavi.cilideafricaneb.demo.controller;

import com.tavi.cilideafricaneb.demo.persistance.dto.GaleryDto;
import com.tavi.cilideafricaneb.demo.service.GaleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
public class GaleryController {
    @Autowired
    private GaleryService galeryService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admgalery123")
    public void save(@RequestBody GaleryDto galeryDto){
        galeryService.save(galeryDto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admgalery123")
    public void update(@RequestBody GaleryDto galeryDto){
        galeryService.update(galeryDto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admgalery123/{id}")
    public void delete(@PathVariable(name = "id") long id){
        galeryService.delete(id);
    }
    @GetMapping("/galery123")
    public List<GaleryDto> getAll(){
        return galeryService.getAll();
    }
    @GetMapping("/galery123/{id}")
    public GaleryDto getOne(@PathVariable(name = "id") long id){
        return galeryService.getOne(id);
    }
}
