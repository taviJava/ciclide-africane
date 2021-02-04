package com.tavi.cilideafricaneb.demo.controller;

import com.tavi.cilideafricaneb.demo.persistance.dto.DistributorDto;
import com.tavi.cilideafricaneb.demo.service.DistributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class DistributorController {
    @Autowired
    private DistributorService distributorService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admdistributors")
    public void add(@RequestBody DistributorDto distributorDto){
        distributorService.add(distributorDto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admdistributors/{id}")
    public void delete(@PathVariable(name = "id") long id){
        distributorService.delete(id);
    }
    @GetMapping("/distributors")
    public List<DistributorDto> getAll(){
        return distributorService.getAll();
    }
}
