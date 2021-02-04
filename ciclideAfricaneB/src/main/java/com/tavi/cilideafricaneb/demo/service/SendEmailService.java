package com.tavi.cilideafricaneb.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.*;

@Component
public class SendEmailService  {

    @Autowired
    private JavaMailSender mailSender;



    public void sendEmail( long id, String name, String message, String email, String city) {

        SimpleMailMessage msg = new SimpleMailMessage();
//        msg.setTo("The.mirch@gmail.com");
        msg.setTo("tavi.zorila@gmail.com");

        msg.setSubject("Mesaj nou pe ciclideafricane.ro de la "+ name + "");
        msg.setText(""+ message + "\n \n Trimis de: "+ name +" din: "+ city + " \n \n Email: "+ email +""   );

        mailSender.send(msg);

    }

}
