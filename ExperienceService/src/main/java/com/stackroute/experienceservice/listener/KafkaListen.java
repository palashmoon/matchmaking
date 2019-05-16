package com.stackroute.experienceservice.listener;

import com.stackroute.experienceservice.domain.CommonOutput;
import com.stackroute.experienceservice.domain.Relationships;
import com.stackroute.experienceservice.domain.Section;
import com.stackroute.experienceservice.resource.IndexResource;
import com.stackroute.experienceservice.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;


@Service
public class KafkaListen {
    @Autowired
    private ExperienceService experienceService;


    @KafkaListener(topics="${kafka.linsteningTopic}",groupId = "${kafka.groupId}",containerFactory = "${kafka.containerFactory}")
    public void consumeJson(@Payload Section exp)
    {
        experienceService.processExperienceDetails(exp);
    }
}