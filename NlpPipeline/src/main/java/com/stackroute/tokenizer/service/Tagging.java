package com.stackroute.tokenizer.service;

import com.stackroute.tokenizer.domain.Output;
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

/*This class is for tagging the tokens under different tags (i.e- education,location,etc)*/

@Component
public class Tagging {
    private static FileReader jsonFile;
    static Logger logger = LoggerFactory.getLogger(Tagging.class);

    public Output tagProccesedTokens(List<String> inputTokens,Map<String, Double> tokens) throws IOException {
        List<String> educations = new ArrayList<>();
        List<String> experiences = new ArrayList<>();
        List<String> skills = new ArrayList<>();
        List<String> certifications = new ArrayList<>();
        List<String> location = new ArrayList<>();
        String parseString=new FetchJSON().getAllData();

        HashMap<String, String> cacheMap = new HashMap<>();
        try {
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(parseString);
            Set<String> keySet = jsonObject.keySet();
            for (String key : keySet) {
                JSONArray jsonArray = (JSONArray) jsonObject.get(key);
                Iterator iterator = jsonArray.iterator();
                while (iterator.hasNext()) {
                    JSONObject words = (JSONObject) iterator.next();
                    cacheMap.put(words.get("name").toString().toLowerCase(), key);
                }
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (cacheMap.size() != 0) {

            for (Map.Entry<String, Double> token : tokens.entrySet()) {

                String word = token.getKey().toLowerCase();

                if (cacheMap.containsKey(word)) {
                    String tag = cacheMap.get(word);
                    if (tag.equals("education")) {
                        educations.add(word);
                    } else if (tag.equals("skills")) {
                        skills.add(word);
                    } else if (tag.equals("locations")) {
                        location.add(word);
                    } else if (tag.equals("experience")) {
                        experiences.add(word);
                    }
                }


            }

            for (String word: inputTokens){
                word=word.toLowerCase();
                int x=0;
                try {
                    x= Integer.parseInt(word);
                    if(!experiences.contains(word)) {
                        experiences.add(word);
                    }
                }catch (NumberFormatException e) {
                    e.printStackTrace();
                }
                if (cacheMap.containsKey(word)){
                    String tag = cacheMap.get(word);
                    if (tag.equals("education")){
                        if(!educations.contains(word)) {
                            educations.add(word);
                        }
                    }else if (tag.equals("skills")){

                        if(!skills.contains(word)) {
                            skills.add(word);
                        }

                    }else if (tag.equals("locations")){
                        if(!location.contains(word)) {
                            location.add(word);
                        }

                    }else if (tag.equals("experience")){
                        if(!experiences.contains(word)) {
                            experiences.add(word);
                        }
                    }else if (tag.equals("project")){


                    }else if (tag.equals("certification")){

                    }
                }
            }

        }
        Output output = Output.builder()
                .educations(educations)
                .skills(skills)
                .experiences(experiences)
                .locations(location)
                .build();


        logger.info("output: {}", output);
        return output;
    }
}


