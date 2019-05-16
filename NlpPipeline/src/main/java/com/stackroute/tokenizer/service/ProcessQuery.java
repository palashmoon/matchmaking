package com.stackroute.tokenizer.service;

import com.stackroute.tokenizer.domain.Output;
import com.stackroute.tokenizer.producer.DataSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.IOException;
import java.util.*;

public class ProcessQuery {

    @Autowired
    private DataSender dataSender;

    private static Logger logger = LoggerFactory.getLogger(ProcessQuery.class);
    /*
     *  Query will be  tokenize and redundant tokens will be removed out.
     */
    public Output tokenizeQuery(String query) {

        Map<String,Double> tokens = DocProcessor.getInstance().performNGramAnalysis(query);
        logger.info("Tokens after NGram: {}",tokens);
        List<String> inputTokens=Arrays.asList(query.split("\\s+"));
        Output output=null;
        try {
            output=tagProcessTokens(inputTokens,tokens);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return output;
    }

    /*
     *  tokens will be tagged and result will be send as output
     */
    public Output tagProcessTokens(List<String> inputTokens,Map<String,Double> tokens) throws IOException {

        Output output = new Tagging().tagProccesedTokens(inputTokens,tokens);

        //sendToKafka(output);
        return output;
    }
    public void sendToKafka(Output output){
        System.out.println("output12 "+output);
        dataSender.postData(output);
    }
}
