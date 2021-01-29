package com.tavi.cilideafricaneb.demo.controller;

import com.tavi.cilideafricaneb.demo.persistance.dto.MessageDto;
import com.tavi.cilideafricaneb.demo.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/message")
    public void save(@RequestBody MessageDto messageDto ){
        messageService.sendMessage(messageDto);
    }
}
