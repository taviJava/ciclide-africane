package com.tavi.cilideafricaneb.demo.controller;

import com.tavi.cilideafricaneb.demo.persistance.dto.SpeciesDto;
import com.tavi.cilideafricaneb.demo.service.SpeciesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
public class SpeciesController {
    @Autowired
    private SpeciesService speciesService;

    @PostMapping("/species")
    public void save(@RequestBody SpeciesDto speciesDto){
        speciesService.save(speciesDto);
    }
    @PutMapping("/species")
    public void update(@RequestBody SpeciesDto speciesDto){
        speciesService.update(speciesDto);
    }
    @DeleteMapping("/species{id}")
    public void delete(@PathVariable(name = "id") long id){
        speciesService.delete(id);
    }
    @GetMapping("/species")
    public List<SpeciesDto> getAll(){
        return speciesService.getAll();
    }
    @GetMapping("/species{id}")
    public SpeciesDto getOne(@PathVariable(name = "id") long id){
        return speciesService.getOne(id);
    }
}
