//package com.stackroute.matchMaking.controller;
//
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.stackroute.matchMaking.domain.Experience;
//import com.stackroute.matchMaking.domain.CommonOutput;
////import com.stackroute.matchMaking.service.ExperienceService;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//
//@RunWith(SpringRunner.class)
//@WebMvcTest
//public class ExperienceControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    private Experience experience;
//    private CommonOutput outputJson;
//    private RelationProperties relationProperties;
//
//    @MockBean
//    private ExperienceService experienceService;
//
//    @InjectMocks
//    private ExperienceController experienceController;
//
//    @Before
//    public void setUp(){
//
//        MockitoAnnotations.initMocks(this);
////        mockMvc = MockMvcBuilders.standaloneSetup(ExperienceController).build();
//        experience = new Experience();
//        experience.setId(1);
//        experience.setOperationType("add");
//        experience.setOrganisation("StackRoute");
//        experience.setRole("Developer");
//        experience.setFromDate(22);
//        experience.setFromMonth(7);
//        experience.setFromYear(2015);
//        experience.setToDate(27);
//        experience.setToMonth(8);
//        experience.setToYear(2018);
//
//        relationProperties = new RelationProperties();
//        relationProperties.setRole("Developer");
//        relationProperties.setDuration(3);
//
//        outputJson = new CommonOutput();
//        outputJson.setSourceNode(1);
//        outputJson.setSourceNodeProperties("");
//        outputJson.setTerminalNode("StackRoute");
//        outputJson.setTerminalNodeProperties("");
//        outputJson.setRelationshipType(relationProperties);
//        outputJson.setOperationType("add");
//
//    }
//
//    @Test
//    public void experienceTest() throws Exception {
//        when(experienceService.processExperience(experience)).thenReturn(outputJson);
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/experience")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(asJsonString(experience)))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//    }
//
//
//
//    @Test
//    public void experienceTestFailure() throws Exception {
//        when(experienceService.processExperience(experience)).thenThrow(Exception.class);
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/experience")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(asJsonString(experience)))
//                .andExpect(MockMvcResultMatchers.status().isConflict())
//                .andDo(MockMvcResultHandlers.print());
//    }
//
//
//
//
//
//
//
//
//    private static String asJsonString(final Object obj)
//    {
//        try{
//            return new ObjectMapper().writeValueAsString(obj);
//
//        }catch(Exception e){
//            throw new RuntimeException(e);
//        }
//    }
//}
