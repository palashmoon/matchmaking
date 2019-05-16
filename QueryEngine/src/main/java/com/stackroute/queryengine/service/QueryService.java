package com.stackroute.queryengine.service;

import com.stackroute.queryengine.domain.*;
import com.stackroute.queryengine.domain.employee.Employee;
import org.neo4j.driver.v1.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.web.socket.messaging.WebSocketStompClient;



@Service
public class QueryService {
    private static final Logger LOGGER = LoggerFactory.getLogger(QueryService.class);

    @Autowired
    private FetchJson fetchJson;


    static public  class MyStompSessionHandler
            extends StompSessionHandlerAdapter {
        private String userId;

        public MyStompSessionHandler(String userId)
        {
            this.userId = userId;
        }

    }


    public void runquery(Driver driver, Output output) {
        try (Session session = driver.session()) {
            List<String> user = new ArrayList<>();

            Skill skill = Skill.builder().skill(output.getSkills()).build();
            Location location = Location.builder().name(output.getLocations()).build();
            Education education = Education.builder().name(output.getEducations()).build();
            Experience experience = Experience.builder().experience(output.getExperiences()).build();
            if (skill.getSkill().isEmpty() && location.getName().isEmpty() &&
                    education.getName().isEmpty() && experience.getExperience().isEmpty()
            )
            {
                user = null;
            }
            else {
                String k;
                String skillArr = new String();
                String locationArr = new String();
                String educationArr = new String();


                String skillArray = new String();
                String skillParam = new String();
                String skillWhere = new String();
                String skillWith = new String();
                String skillAll = new String();

                String locationArray = new String();
                String locationParam = new String();
                String locationWhere = new String();
                String locationWith = new String();
                String locationAll = new String();

                String educationArray = new String();
                String educationParam = new String();
                String educationWhere = new String();
                String educationWith = new String();
                String educationAll = new String();


                if (!skill.getSkill().isEmpty()) {
                    for (int i = 0; i < skill.getSkill().size(); i++)
                        skillArr += "'" + skill.getSkill().get(i) + "',";

                    skillArr = skillArr.substring(0, skillArr.length() - 1);

                    skillArray = skill.getSkill().size() == 0 ? "" : "[" + skillArr + "] AS skills,";
                    skillParam = skillArray.length() == 0 ? "" : "(s:Skill),";
                    skillWhere = skillParam.length() == 0 ? "" : "s.name in skills";
                    skillWith = skillWhere.length() == 0 ? "" : "collect(s) AS skill,";
                    skillAll = skillWith.length() == 0 ? "" : "(ALL (s in skill WHERE (m)-[*1..2]-(s:Skill)))";

                }

                if (!location.getName().isEmpty()) {
                    for (int i = 0; i < location.getName().size(); i++)
                        locationArr += "'" + location.getName().get(i) + "',";

                    locationArr = locationArr.substring(0, locationArr.length() - 1);

                    locationArray = location.getName().size() == 0 ? "" : "[" + locationArr + "] AS locations,";
                    locationParam = locationArray.length() == 0 ? "" : "(l:Location),";
                    locationWhere = locationParam.length() == 0 ? "" : " AND l.name in locations";
                    locationWith = locationWhere.length() == 0 ? "" : " collect(l) AS location,";
                    locationAll = locationWith.length() == 0 ? "" : " AND (ALL(l in location WHERE (l)-[*1..2]-(m)))";

                }

                if (!education.getName().isEmpty()) {
                    for (int i = 0; i < education.getName().size(); i++)
                        educationArr += "'" + education.getName().get(i) + "',";

                    educationArr = educationArr.substring(0, educationArr.length() - 1);

                    educationArray = education.getName().size() == 0 ? "" : "[" + educationArr + "] AS educations";
                    educationParam = educationArray.length() == 0 ? "" : " (e:Education)";
                    educationWhere = educationParam.length() == 0 ? "" : " AND e.name in educations";
                    educationWith = educationWhere.length() == 0 ? "" : " collect(e) AS education";
                    educationAll = educationWith.length() == 0 ? "" : " AND (ALL(e in education WHERE (e)<-[:qualified_from]-(m)))";
                }


                String str = experience.getExperience().isEmpty() ? "" : " -[r:works_in]->(o:Organization) " +
                        "where r.duration >='" + experience.getExperience().get(0) + "'";


                if (educationArray.isEmpty() && !locationArray.isEmpty()) {
                    locationArray = locationArray.substring(0, locationArray.length() - 1);
                }
                if (locationArray.isEmpty() && educationArray.isEmpty() && !skillArray.isEmpty()) {
                    skillArray = skillArray.substring(0, skillArray.length() - 1);
                }


                if (educationParam.isEmpty() && !locationParam.isEmpty()) {
                    locationParam = locationParam.substring(0, locationParam.length() - 1);
                }
                if (locationParam.isEmpty() && educationParam.isEmpty() && !skillParam.isEmpty()) {
                    skillParam = skillParam.substring(0, skillParam.length() - 1);
                }


                if (skillWhere.isEmpty() && !locationWhere.isEmpty()) {
                    locationWhere = locationWhere.substring(5);
                }
                if (skillWhere.isEmpty() && locationWhere.isEmpty() && !educationWhere.isEmpty()) {
                    educationWhere = educationWhere.substring(5);
                }


                if (educationWith.isEmpty() && !locationWith.isEmpty()) {
                    locationWith = locationWith.substring(0, locationWith.length() - 1);
                }
                if (locationWith.isEmpty() && educationWith.isEmpty() && !skillWith.isEmpty()) {
                    skillWith = skillWith.substring(0, skillWith.length() - 1);
                }


                if (skillAll.isEmpty() && !locationAll.isEmpty()) {
                    locationAll = locationAll.substring(5);
                }
                if (skillAll.isEmpty() && locationAll.isEmpty() && !educationAll.isEmpty()) {
                    educationAll = educationAll.substring(5);
                }

                if(skill.getSkill().isEmpty() && education.getName().isEmpty() && location.getName().isEmpty()
                        && !experience.getExperience().isEmpty())
                {
                    k=" MATCH (m:User) " + str + "RETURN m.userId as name1";
                    //user=queryRepository.getUserExp(str);
                }
                else
                    {
                    k = "WITH " + skillArray + locationArray + educationArray +
                            " MATCH " + skillParam + locationParam + educationParam +
                            " WHERE " + skillWhere + locationWhere + educationWhere +
                            " WITH " + skillWith + locationWith + educationWith +
                            " MATCH (m:User) " + str +
                            " WHERE " + skillAll + locationAll + educationAll +
                            " RETURN m.userId as name1";
//                    user=queryRepository.getUser(skillArray,locationArray,educationArray,skillParam,locationParam,
//                            educationParam,skillWhere,locationWhere,educationWhere,skillWith,locationWith,
//                            educationWith,str,skillAll,locationAll,educationAll);
                    LOGGER.info("After query run");
                }


                try (Transaction tx = session.beginTransaction()) {
                    StatementResult result = tx.run(k);
                    while (result.hasNext()) {
                        Record record = result.next();
                        user.add(record.get("name1").asString());
                    }

                    tx.success();  // Mark this write as successful.
                }

                try {
                    WebSocketClient simpleWebSocketClient = new StandardWebSocketClient();

                    List<Transport> transports = new ArrayList<>(1);
                    transports.add(new WebSocketTransport(simpleWebSocketClient));
                    SockJsClient sockJsClient = new SockJsClient(transports);
                    WebSocketStompClient stompClient = new WebSocketStompClient(sockJsClient);
                    stompClient.setMessageConverter(new MappingJackson2MessageConverter());
                    String url = "ws://localhost:8069/socket";
                    String userId = "search" +
                            ThreadLocalRandom.current().nextInt(1, 99);
                    StompSessionHandler sessionHandler = new MyStompSessionHandler(userId);
                    StompSession session1 = stompClient.connect(url, sessionHandler)
                            .get();


                for (int i = 0; i < user.size(); i++) {
                   Employee employee = fetchJson.getAllData(user.get(i));
                    Message message=Message.builder().from("search").employee(employee)
                            .build();
                    session1.send("/channel/socket/messages",message);
                    LOGGER.info("Employee {}" + employee);
                }

                }catch (InterruptedException exception){
                    LOGGER.info(exception.getMessage());

                }catch(ExecutionException eexp){
                    LOGGER.info(eexp.getMessage());
                }

            }
        }
    }
}
