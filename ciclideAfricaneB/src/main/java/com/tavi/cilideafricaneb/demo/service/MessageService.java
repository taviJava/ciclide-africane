package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.persistance.dto.MessageDto;
import com.tavi.cilideafricaneb.demo.persistance.model.MessageModel;
import com.tavi.cilideafricaneb.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private SendEmailService sendEmailService;

    private MessageModel getModel(MessageDto messageDto){
        MessageModel messageModel = new MessageModel();
        messageModel.setEmail(messageDto.getEmail());
        messageModel.setMessage(messageDto.getMessage());
        messageModel.setName(messageDto.getName());
        messageModel.setCity(messageDto.getCity());
        return messageModel;
    }
    private void add(MessageDto messageDto){
        messageRepository.save(getModel(messageDto));
    }
    public String sendMessage(MessageDto messageDto){

        int messagesNumberBefore = messageRepository.findAll().size();
        System.out.println(messagesNumberBefore);
        add(messageDto);
        int messageNumberAfter = messageRepository.findAll().size();
        System.out.println(messageNumberAfter);
        if (messageNumberAfter > messagesNumberBefore){
            sendEmailService.sendEmail(messageDto.getId(),messageDto.getName(),messageDto.getMessage(), messageDto.getEmail(), messageDto.getCity());
            return "Mesajul a fost trimis cu succes! \n Mulțumim!";
        }else return "Ne pare rau, mesajul nu s-a transmis";
    }
}
