package com.example.upstream.domain;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
//This class is used to remove hardcoded strings from code using application.yml

@Component
@ConfigurationProperties("controller")
public class ControllerProperties {
    private String base;
    private String education;
    private String location;
    private String skills;
    private String project;
    private String certificates;
    private String experience;

    public String getBase() {
        return base;
    }

    public void setBase(String base) {
        this.base = base;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getCertificates() {
        return certificates;
    }

    public void setCertificates(String certificates) {
        this.certificates = certificates;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    @Override
    public String toString() {
        return "ControllerProperties{" +
                "base='" + base + '\'' +
                ", education='" + education + '\'' +
                ", location='" + location + '\'' +
                ", skills='" + skills + '\'' +
                ", project='" + project + '\'' +
                ", certificates='" + certificates + '\'' +
                ", experience='" + experience + '\'' +
                '}';
    }
}
