package com.stackroute.downstreamservice.repository;

import com.stackroute.downstreamservice.domain.Education;
import com.stackroute.downstreamservice.domain.Employee;
import com.stackroute.downstreamservice.domain.Institution;
import com.stackroute.downstreamservice.domain.Qualification;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataMongoTest
public class EmployeeRepositoryTest {

    @Autowired
    EmployeeRepository employeeRepository;

    Employee employee1,employee2;
    List<Employee> employeeList;
    Qualification qualification;
    Institution institution;
    Education education;
    List<Education> educations;

    @Before
    public void setUp() throws Exception {
    employee1=Employee.builder().userId("abc@gmail.com")
            .email("abc@gmail.com").name("Suhrid").build();


    qualification=Qualification.builder().qualificationId("3").title("BTech").build();

    institution=Institution.builder()
                .institutionId("1")
                .institutionName("NIT")
                .startDate("17/06/2010")
                .endDate("23/07/2014")
                .build();

    education=Education.builder().qualification(qualification)
                .institution(institution)
                .summary("Computer Science and Engineering")
                .build();
    educations=new ArrayList<Education>();
    educations.add(education);

    employee2=Employee.builder()
            .email("tiyt.eirui@gmail.com")
            .userId("477")
            .name("Harry")
            .educations(educations)
            .build();

    }

    @After
    public void tearDown() throws Exception {
        employeeRepository.deleteAll();
    }

    @Test
    public void saveMovieSuccess(){

        employeeRepository.save(employee1);

        Employee actual=employeeRepository.findById(employee1.getUserId()).get();

        assertEquals(employee1.toString(),actual.toString());


    }

//    @Test
//    @Expected()
//    public void saveMovieFailure(){
//
//        employeeRepository.save(employee1);
//
//        Employee actual=employeeRepository.findById(employee1.getUserId()).get();
//
//        assertEquals(employee1.toString(),actual.toString());
//
//
//    }





}