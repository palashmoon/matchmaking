package com.example.WebsocketService.controller;


import com.example.WebsocketService.domain.OutputMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.example.WebsocketService.domain.Message;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;


@Controller
@CrossOrigin()
public class WebSocketController {
    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template=template;
    }

    @MessageMapping("/socket/messages")
    @SendTo("/search/messages")
    public OutputMessage send(Message message){
        System.out.println("Message recieved" +message);
        return OutputMessage.builder().from(message.getFrom()).employee(message.getEmployee())
                .date(new Date()).build();
    }
}

