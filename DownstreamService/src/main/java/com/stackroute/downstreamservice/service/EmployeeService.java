package com.stackroute.downstreamservice.service;

import com.stackroute.downstreamservice.domain.*;
import com.stackroute.downstreamservice.exceptions.EmployeeAlreadyExistsException;
import com.stackroute.downstreamservice.exceptions.EmployeeNotFoundException;

import com.stackroute.downstreamservice.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@PropertySource("classpath:config.properties")
public class EmployeeService {

    private EmployeeRepository employeeRepository;

    @Autowired
    private Environment environment;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    //    Method for getting an employee from the Employees Document of MongoDB
    public Employee getEmployee(String employeeId) throws EmployeeNotFoundException {
        Employee employee;
        if (employeeRepository.existsById(employeeId)) {
            employee = employeeRepository.findById(employeeId).get();
            return employee;
        } else {
            throw new EmployeeNotFoundException(environment.getProperty("errors.emptyDatabase"));
        }
    }

    public boolean updateData(String employeeId,BasicInfo basicInfo) throws EmployeeNotFoundException{
        Employee employee;
        if (employeeRepository.existsById(employeeId)) {
            employee = employeeRepository.findById(employeeId).get();
            BasicInfo basicInfo1=BasicInfo.builder().build();
            if(employee.getBasicInfo()!=null) {
                basicInfo1 = employee.getBasicInfo();
            }
            if(basicInfo.getContactNo()!=null){
                basicInfo1.setContactNo(basicInfo.getContactNo());
            }
            if(basicInfo.getDob()!=null){
                basicInfo1.setDob(basicInfo.getDob());
            }
            if(basicInfo.getContactNo()!=null){
                basicInfo1.setGender(basicInfo.getGender());
            }
            if(basicInfo.getGithubUrl()!=null){
                basicInfo1.setGithubUrl(basicInfo.getGithubUrl());
            }
            if(basicInfo.getLinkedinUrl()!=null){
                basicInfo1.setLinkedinUrl(basicInfo.getLinkedinUrl());
            }

            employee.setBasicInfo(basicInfo1);
            employeeRepository.save(employee);
            return true;
        } else {
            throw new EmployeeNotFoundException(environment.getProperty("errors.employeeNotFound"));
        }

    }

    //    Method for getting all employees from the Employees Document of MongoDB
    public List<Employee> getAllEmployee() throws EmployeeNotFoundException {
        List<Employee> employees = employeeRepository.findAll();
        if (!employees.isEmpty()) {

            return employees;
        } else {
            throw new EmployeeNotFoundException(environment.getProperty("errors.emptyDatabase"));
        }
    }

    //    Method for adding an employee into the Employees Document of MongoDB
    public void saveEmployee(Employee employee) throws EmployeeAlreadyExistsException {
        if (!employeeRepository.existsById(employee.getUserId())) {
            employeeRepository.save(employee);
        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeAlreadyExist"));
        }
    }

    //    Method for adding education data to list of education of a particular employee into the Employees Document of MongoDB
    public void addEducationData(List<Education> educations, String userId) throws EmployeeNotFoundException {
        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<Education> fetchEducations = employee.getEducations();
            if (fetchEducations == null) {
                fetchEducations = new ArrayList<>();
            }
            for (Education education : educations) {
                if(fetchEducations.contains(education)){
                    continue;
                }else {
                    fetchEducations.add(education);
                }
            }
            employee.setEducations(fetchEducations);
            employeeRepository.save(employee);

        } else {
            throw new EmployeeNotFoundException(environment.getProperty("errors.employeeNotFound"));
        }

    }

    //    Method for adding skill to skills of a particular employee into the Employees Document of MongoDB
    public void addSkillsData(List<Skills> skills, String userId) throws EmployeeNotFoundException {
        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<Skills> fetchSkills = employee.getSkills();
            if (fetchSkills == null) {
                fetchSkills = new ArrayList<>();
            }
            for (Skills skills1 : skills) {
                if(fetchSkills.contains(skills1)){
                    continue;
                }else {
                    fetchSkills.add(skills1);
                }
                }
            employee.setSkills(fetchSkills);
            employeeRepository.save(employee);

        } else {
            throw new EmployeeNotFoundException(environment.getProperty("errors.employeeNotFound"));
        }

    }

    //    Method for adding location to locations of a particular employee into the Employees Document of MongoDB
    public void addLocationData(Location locations, String userId) throws EmployeeNotFoundException {
        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            Location fetchLocation = employee.getLocation();
            if (fetchLocation == null) {
                fetchLocation = Location.builder().build();
            }
            List<PastLocation> pastLocations = fetchLocation.getPastLocation();
            if (pastLocations == null) {
                pastLocations = new ArrayList<>();
            }

            if (locations.getCurrentLocation() != fetchLocation.getCurrentLocation()&&locations.getCurrentLocation()!=null) {
                fetchLocation.setCurrentLocation(locations.getCurrentLocation());
            }

            for (PastLocation pastLocation : locations.getPastLocation()) {
                if(pastLocations.contains(pastLocation)){
                    continue;
                }else {
                    pastLocations.add(pastLocation);
                }
            }
            fetchLocation.setPastLocation(pastLocations);
            employee.setLocation(fetchLocation);
            employeeRepository.save(employee);

        } else {
            throw new EmployeeNotFoundException(environment.getProperty("errors.employeeNotFound"));
        }

    }

    //    Method for adding experience to experiences of a particular employee into the Employees Document of MongoDB
    public void addExperienceData(List<Experience> experiences, String userId) throws EmployeeNotFoundException {
        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<Experience> fetchExperiences = employee.getExperiences();
            if (fetchExperiences == null) {
                fetchExperiences = new ArrayList<>();
            }
            for (Experience experience : experiences) {
               if(fetchExperiences.contains(experience)){
                   continue;
               }else {
                   fetchExperiences.add(experience);
               }
               }
            employee.setExperiences(fetchExperiences);
            employeeRepository.save(employee);

        } else {
            throw new EmployeeNotFoundException(environment.getProperty("errors.employeeNotFound"));
        }

    }

    //    Method for adding project to projects of a particular employee into the Employees Document of MongoDB
    public void addProjectData(List<ProjectDetails> projects, String userId) throws EmployeeNotFoundException {
        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<ProjectDetails> fetchProjects = employee.getProjects();
            if (fetchProjects == null) {
                fetchProjects = new ArrayList<>();
            }
            for (ProjectDetails project : projects) {
                if(fetchProjects.contains(project)) {
                    continue;

                }else{
                    fetchProjects.add(project);
                }
            }
            employee.setProjects(fetchProjects);
            employeeRepository.save(employee);

        } else {
            throw new EmployeeNotFoundException(environment.getProperty("errors.employeeNotFound"));
        }

    }


    //    Method for adding certificate data of a particular employee into the Employees Document of MongoDB
    public void addCertificateData(List<Certificate> certificates, String userId) throws EmployeeNotFoundException {
        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<Certificate> fetchCertificates = employee.getCertificates();
            if (fetchCertificates == null) {
                fetchCertificates = new ArrayList<>();
            }
            for (Certificate certificate : certificates) {
                if(fetchCertificates.contains(certificate)){
                    continue;
                }else {
                    fetchCertificates.add(certificate);
                }
                }
            employee.setCertificates(fetchCertificates);
            employeeRepository.save(employee);

        } else {
            throw new EmployeeNotFoundException(environment.getProperty("errors.employeeNotFound"));
        }

    }

    //Method for deleting education data for the database

    public boolean deleteEducationData(Education education, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<Education> fetchEducation = employee.getEducations();
            for (Education tempEducation : fetchEducation) {
                if (tempEducation.toString().equals(education.toString())) {
                    fetchEducation.remove(tempEducation);
                    break;
                }
            }
            employee.setEducations(fetchEducation);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }

    //Method for deleting education data for the database

    public boolean deleteProjectData(ProjectDetails project, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<ProjectDetails> fetchProject = employee.getProjects();
            for (ProjectDetails tempProjects : fetchProject) {
                if (tempProjects.toString().equals(project.toString())) {
                    fetchProject.remove(tempProjects);
                    break;
                }
            }
            employee.setProjects(fetchProject);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }

    //Method for deleting education data for the database

    public boolean deleteExperienceData(Experience experience, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<Experience> fetchExperience = employee.getExperiences();
            for (Experience tempExperience : fetchExperience) {
                if (tempExperience.toString().equals(experience.toString())) {
                    fetchExperience.remove(tempExperience);
                    break;
                }
            }
            employee.setExperiences(fetchExperience);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }
    //Method for deleting education data for the database

    public boolean deleteCertificateData(Certificate certificate, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<Certificate> fetchCertificate = employee.getCertificates();
            for (Certificate tempCertificate : fetchCertificate) {
                if (tempCertificate.getLicenseNumber().toString().equals(certificate.getLicenseNumber().toString())) {
                    fetchCertificate.remove(tempCertificate);
                    break;
                }
            }
            employee.setCertificates(fetchCertificate);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }
    //Method for deleting education data for the database

    public boolean deleteSkillsData(Skills skills, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<Skills> fetchSkills = employee.getSkills();
            for (Skills tempSkills : fetchSkills) {
                if (tempSkills.getSkillId().toString().equals(skills.getSkillId().toString())) {
                    fetchSkills.remove(tempSkills);
                    break;
                }
            }
            employee.setSkills(fetchSkills);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }

    //Method for deleting education data for the database

    public boolean deleteCurrentLocationData(CurrentLocation currentLocation, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            Location fetchLocation = employee.getLocation();
            CurrentLocation currentLocation1=CurrentLocation.builder().build();
            Location newLocation = Location.builder().currentLocation(currentLocation1).pastLocation(fetchLocation.getPastLocation()).build();
            employee.setLocation(newLocation);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }


    public boolean deleteLocationData(String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
              Location newLocation = Location.builder().build();
            employee.setLocation(newLocation);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }

    public boolean deletePastLocation(PastLocation pastLocations, String userId) throws Exception {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            Location fetchLocation = employee.getLocation();
            List<PastLocation> pastLocationList = fetchLocation.getPastLocation();
            for (PastLocation pastLocation : pastLocationList) {
                if (pastLocation.getPastLocationId().equals(pastLocations.getPastLocationId())) {
                    pastLocationList.remove(pastLocation);
                    break;
                }
            }
            fetchLocation.setPastLocation(pastLocationList);
            employee.setLocation(fetchLocation);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }

    }


    public boolean updateSkillsData(Skills skills, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            int i=0;
            Employee employee = employeeRepository.findById(userId).get();
            List<Skills> fetchSkills = employee.getSkills();
            for (Skills tempSkills : fetchSkills) {
                if (tempSkills.getSkillId().equals(skills.getSkillId())) {
                    fetchSkills.remove(tempSkills);
                    fetchSkills.add(i,skills);
                    break;
                }
                i++;
            }
            employee.setSkills(fetchSkills);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }

    public boolean updateCertificateData(Certificate certificate, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            int i=0;
            Employee employee = employeeRepository.findById(userId).get();
            List<Certificate> fetchCertificate = employee.getCertificates();
            for (Certificate tempCertificate : fetchCertificate) {
                if (tempCertificate.getLicenseNumber().toString().equals(certificate.getLicenseNumber().toString())) {
                    fetchCertificate.remove(tempCertificate);
                    fetchCertificate.add(certificate);
                    break;
                }
                i++;
            }
            employee.setCertificates(fetchCertificate);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }

    public boolean updateExperienceData(Experience experience, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<Experience> fetchExperience = employee.getExperiences();
            int i=0;
            for (Experience tempExperience : fetchExperience) {
                if (tempExperience.getFromDate().equals(experience.getFromDate())
                        && tempExperience.getFromMonth().equals(experience.getFromMonth())
                        && tempExperience.getFromYear().equals(experience.getFromYear())
                        || tempExperience.getOrganisation().equals(experience.getOrganisation())
                ) {
                    fetchExperience.remove(tempExperience);
                    fetchExperience.add(i,experience);
                    break;
                }
                i++;
            }
            employee.setExperiences(fetchExperience);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }

    public boolean updateProjectData(ProjectDetails project, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            List<ProjectDetails> fetchProject = employee.getProjects();
            int i=0;
            for (ProjectDetails tempProjects : fetchProject) {
                if (tempProjects.getTitle().toString().equals(project.getTitle().toString())) {
                    fetchProject.remove(tempProjects);
                    fetchProject.add(i,project);
                    break;
                }
                i++;
            }
            employee.setProjects(fetchProject);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }


    public boolean updateEducationData(Education education, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            int i=0;
            List<Education> fetchEducation = employee.getEducations();
            for (Education tempEducation : fetchEducation) {
                if (tempEducation.getQualification().getQualificationId().toString().equals(education.getQualification().getQualificationId().toString())) {
                    fetchEducation.remove(tempEducation);
                    fetchEducation.add(i,education);
                    break;
                }
                i++;
            }
            employee.setEducations(fetchEducation);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }

    public boolean updateCurrentLocationData(CurrentLocation currentLocation, String userId) throws EmployeeAlreadyExistsException {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            Location fetchLocation = employee.getLocation();
            fetchLocation.setCurrentLocation(currentLocation);
            employee.setLocation(fetchLocation);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }
    }

    public boolean updatePastLocation(PastLocation pastLocations, String userId) throws Exception {

        if (employeeRepository.existsById(userId)) {
            Employee employee = employeeRepository.findById(userId).get();
            Location fetchLocation = employee.getLocation();
            List<PastLocation> pastLocationList = fetchLocation.getPastLocation();
            int i=0;
            for (PastLocation pastLocation : pastLocationList) {
                if (pastLocation.getPastLocationId().equals(pastLocations.getPastLocationId())) {
                    pastLocationList.remove(pastLocation);
                    pastLocationList.add(i,pastLocations);
                    break;
                }
                i++;
            }
            fetchLocation.setPastLocation(pastLocationList);
            employee.setLocation(fetchLocation);
            employeeRepository.save(employee);
            return true;

        } else {
            throw new EmployeeAlreadyExistsException(environment.getProperty("errors.employeeNotFound"));
        }

    }

    public void saveCommunity(String employeeId,String community) throws EmployeeNotFoundException {

        if (employeeRepository.existsById(employeeId)) {
            Employee employee = employeeRepository.findById(employeeId).get();
            List<String> communities=new ArrayList<>();
            if(employee.getCommunities()!=null){
                communities=employee.getCommunities();
            }
            communities.add(community);
            employee.setCommunities(communities);
        } else {
            throw new EmployeeNotFoundException(environment.getProperty("errors.emptyDatabase"));
        }
    }


}
