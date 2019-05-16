package com.stackroute.downstreamservice.configuration;

import com.stackroute.downstreamservice.domain.*;
import com.stackroute.downstreamservice.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class PreloadData implements ApplicationListener<ContextRefreshedEvent>, CommandLineRunner {

    private EmployeeRepository employeeRepository;

    public PreloadData(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        employeeRepository.save(Employee.builder().email("abc.cd@gmail.com").userId("476").name("Sal").build());
        Qualification qualification=Qualification.builder().qualificationId("3").title("BTech").build();
        Institution institution=Institution.builder()
                .institutionId("1")
                .institutionName("NIT")
                .startDate("17/06/2010")
                .endDate("23/07/2014")
                .build();

        Education education=Education.builder().qualification(qualification)
                .institution(institution)
                .summary("Computer Science and Engineering")
                .build();
        List<Education> educations=new ArrayList<>();
        educations.add(education);
        employeeRepository.save(Employee.builder()
                .email("tiyt.eirui@gmail.com")
                .userId("477")
                .name("Harry")
                .educations(educations)
                .build());

    }
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        Skills skill= Skills.builder().skillId("1")
                .skillLevel("begineer").skillName("angular").build();
        List<Skills> skills=new ArrayList<>();
        skills.add(skill);
        Employee employee1=Employee.builder().email("sai@gmail.com").userId("475").name("Saitama").skills(skills).build();
        employeeRepository.save(employee1);
        employeeRepository.save(Employee.builder().email("ken@gmail.com").userId("474").name("Kaneki").build());

    }
}
