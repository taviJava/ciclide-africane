package com.tavi.cilideafricaneb.demo.controller;

import com.tavi.cilideafricaneb.demo.persistance.dto.ContactDto;
import com.tavi.cilideafricaneb.demo.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ContactController {
    @Autowired
    private ContactService contactService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admcontact")
    public void save(@RequestBody ContactDto contactDto ){
        contactService.save(contactDto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admcontact")
    public void update(@RequestBody ContactDto contactDto ){
        contactService.update(contactDto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admcontact/{id}")
    public void delete(@PathVariable(name = "id") long id){
        contactService.delete(id);
    }
    @GetMapping("/contact")
    public ContactDto getone(){
        return contactService.getAll().get(0);
    }

}
