package com.stackroute.tokenizer.listener;



import com.stackroute.tokenizer.domain.Output;
import com.stackroute.tokenizer.domain.Search;
import com.stackroute.tokenizer.producer.DataSender;
import com.stackroute.tokenizer.service.ProcessQuery;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.List;

/*Method for listening to user topic and saving*/

@Service
public class KafkaConsumer {

    private static Logger logger = LoggerFactory.getLogger(KafkaConsumer.class);
    @Autowired
    DataSender dataSender;
    @KafkaListener(topics = "${kafka.listeningTopic}", groupId = "${kafka.groupId}",
            containerFactory = "${kafka.containerFactory}")
    public void consumeJson(@Payload Search search) {

        String searchString=search.getQuery();
        logger.info("Search Query Kafka Listen: {}",searchString);
        ProcessQuery query=new ProcessQuery();
        Output output=query.tokenizeQuery(searchString);
        logger.info("Kafka Send Output: {}"+output);
        dataSender.postData(output);
    }



}