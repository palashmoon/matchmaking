package com.example.community.service;



import com.example.community.domain.*;

import org.neo4j.driver.v1.*;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.ArrayList;

import java.util.HashMap;

import java.util.List;

import java.util.Map;



@Service

public class QueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(QueryService.class);

    @Autowired
    InterestService interestService;
    @Autowired
    LocationService locationService;
    @Autowired
    PostJson postJson;

    public void runquery(Driver driver) {



        List<Location> allLocation = locationService.getAlllocation();

        List<Interest> allInterest = interestService.getAllInterest();



        HashMap<Integer, Community> map = new HashMap<Integer, Community>();

        try (Session session = driver.session()) {

            // Wrapping Cypher in an explicit transaction provides atomicity

            // and makes handling errors much easier.

            int count = 0;

            int i = 0;
            RestTemplate restTemplate = new RestTemplate();
            for (Location location : allLocation) {

                for (Interest interest : allInterest) {
                    String q = "MATCH (A:Location {name:'" + location.getName() + "'}),(S:Interest{name:'" + interest.getName() + "'}), p=(A)-[r]-(K),q=(S)-[t]-(K) RETURN count(K.userId) as name1";

                    try (Transaction tx = session.beginTransaction()) {
                        StatementResult result = tx.run(q);
                        while (result.hasNext()) {
                            Record record = result.next();
                            count = record.get("name1").asInt();
                            if (count > 0) {
                                Community community = new Community();
                                System.out.println(count);
//                                System.out.println(location);
//                                System.out.println(interest);
                                community.setLocation(location);
                                community.setInterest(interest);
                                map.put(i, community);
                                i = i +1;
                                System.out.println("communities:"+map);
                            }
                        }





                        tx.success();  // Mark this write as successful.

                    }

                }

            }

            try (Transaction tx = session.beginTransaction()) {

                System.out.println(map.size());

                for (int j = 0; j < map.size(); j++) {


                    System.out.println("community number:"+j);

                    System.out.println(map.get(j).getInterest());

                    System.out.println(map.get(j).getLocation());


                    String inter_loc = "'"+map.get(j).getInterest().getName()+"_"+map.get(j).getLocation().getName()+"'";
                    String Qcomm_present= "match(c:Community{name:"+inter_loc+"}) return c as name3";
                    StatementResult result2 = tx.run(Qcomm_present);
                    if(!result2.hasNext())
                    {
                        String query1 = "create(c:Community{name:" + inter_loc+ "})";
                        StatementResult result3 = tx.run(query1);
                        String reInter="'"+map.get(j).getInterest().getName()+"_"
                                +map.get(j).getLocation().getName()+"'";
                        String queryComm = "match(c:Community{name:"+inter_loc+"}) return c as name3";
                        StatementResult result = tx.run(queryComm);

                        String q1 = "MATCH (A:Location {name:'" + map.get(j).getLocation().getName()
                                + "'}),(S:Interest{name:'" + map.get(j).getInterest().getName()
                                + "'}), p=(A)-[r]-(K),q=(S)-[t]-(K) RETURN (K.userId) as name1";
                        StatementResult result4 = tx.run(q1);

                        while(result.hasNext()) {
                            Record interestRecord = result.next();
                            while (result4.hasNext()) {
                                Record record = result4.next();
                                System.out.println("node for community is created: " + record.get("name1"));
                                String str = interestRecord.get("name3").toString();
                                str = str.substring(0, str.length() - 1);
                                String[] strArr = str.split("<");
                                String q2 = " match(c:Community),(u:User{userId:"
                                        + record.get("name1") + "})" + "where ID(c)= " + strArr[1]
                                        + " create(c)<-[r:is_in]-(u)" +
                                        "return r as name5";
                                StatementResult result5 = tx.run(q2);
                                Community_user community_user = new Community_user();
                                community_user.setCommunityName(inter_loc);
                                community_user.setUserId(record.get("name1").asString());
                                postJson.sendAllData(community_user);





                            }

                        }
                    }else {
                        String q1 = "MATCH (A:Location {name:'" + map.get(j).getLocation().getName()
                                + "'}),(S:Interest{name:'" + map.get(j).getInterest().getName()
                                + "'}), p=(A)-[r]-(K),q=(S)-[t]-(K) RETURN (K.userId) as name1";
                        StatementResult result4 = tx.run(q1);
                        while (result2.hasNext()) {
                            Record interestRecord = result2.next();
                            while (result4.hasNext()) {
                                Record record = result4.next();
                                System.out.println("node for community is created: " + record.get("name1"));
                                String str = interestRecord.get("name3").toString();
                                str = str.substring(0, str.length() - 1);
                                String[] strArr = str.split("<");
                                String q2 = " match(c:Community),(u:User{userId:"
                                        + record.get("name1") + "})" + "where ID(c)= " + strArr[1]
                                        + " create(c)<-[r:is_in]-(u)" +
                                        "return r as name5";
                                StatementResult result5 = tx.run(q2);
                                Community_user community_user = new Community_user();
                                community_user.setCommunityName(inter_loc);
                                community_user.setUserId(record.get("name1").asString());
                                postJson.sendAllData(community_user);



                            }

                        }
//                    String a1 ;

                    }

//                    String q1 = "MATCH (A:Location {name:'" + map.get(j).getLocation().getName() + "'}),(S:Interest{name:'" + map.get(j).getInterest().getName() + "'}), p=(A)-[r]-(K),q=(S)-[t]-(K) RETURN (K.userId) as name1";
//                    StatementResult result = tx.run(q1);

//                    StatementResult result1 = tx.run(a1);


//                    while (result1.hasNext()) {
//
//                        Record record = result1.next();
//
//
//                        System.out.println("node for community is created: ");
//                    }




                    tx.success();  // Mark this write as successful.

                }

            }

        }



    }







    public void close(Driver driver) {

        // Closing a driver immediately shuts down all open connections.

        LOGGER.info("Closing Driver Session");

        driver.close();

    }

}

//        try (Session session = driver.session()) {

//            // Wrapping Cypher in an explicit transaction provides atomicity

//            // and makes handling errors much easier.

//            String q = "MATCH (A:Location),(S:Skill{name:" + "'" + skill.getName() + "'" + "}),p=(A)-[r]-(K),q=(S)-[t]-(K) RETURN K.userId As name1";

//            try (Transaction tx = session.beginTransaction()) {

//                StatementResult result = tx.run(q);

//

//                while (result.hasNext()) {

//                    Record record = result.next();

//                    System.out.println("Result: " + record.get("name1").asString());

//                }

//

//                tx.success();  // Mark this write as successful.

//            }

//        }

//    }