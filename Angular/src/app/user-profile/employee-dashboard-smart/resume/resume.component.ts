import { Organisation } from './../../../add-module/project-dialog/domain/organisation';
import { Certificate } from './../../../add-module/certificate-dialog/domain/certificate';
import { Skill } from './../../../add-module/skill-dialog/domain/skill';
import { Qualification } from 'src/app/add-module/education-dialog/domain/qualification';
import { Institute } from './../../../add-module/education-dialog/domain/institute';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Institution } from 'src/app/add-module/education-dialog/domain/institution';
import { EducationChicklets } from './../../../add-module/education-dialog/domain/educationchicklets';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  @ViewChild('body') body: ElementRef;
temp: FormArray;
temp2: any;
  institutionName: string;
  title: string;
  skillName: string;
  skillLevel: string;
  certificateName: String;
  certificateAuthority: String;
  name: String;
  email: String;
  cityName: String;
  stateName: String;
  organisation: String;
  role: String;
  description: String;
  projectUrl: String;
  skill: String;
  level: String;

  constructor() { }

  ngOnInit() {
  }
  onReciving(employee: any) {
    console.log(employee);
    this.name = employee.name;
    this.email = employee.email;

    // // this.institutionName = employee.educations.institution.institutionName;
    // this.temp = employee.educations;
    // var qualification = new Array();
    // console.log(`education ${this.temp}`);
    // // console.log(`x ${this.education.qualification.title}`);
    // for (const education of employee.educations) {
    // //  qualification.push(education.qualification.title);
    // console.log('x' + education.institution.institutionName);
    // }
    // // console.log('cdcdcdc' + this.temp);
    // // this.temp2 = this.temp.at().get('institution');
    // // console.log('cdcdcdc' + this.temp2);
    // // this.institutionName = this.temp2.institutionName;
    // // console.log('cdcdcdc' + this.institutionName);

    for (const education of employee.educations) {
      this.institutionName = education.institution.institutionName;
      this.title = education.qualification.title;
      console.log('x' + education.institution.institutionName);
      console.log('x' + education.qualification.title);
    }

    for (const skill of employee.skills) {
      this.skillName = skill.skillName;
      this.skillLevel = skill.skillLevel;
    }


    for (const certificate of employee.certificates) {
      this.certificateName = certificate.certificateName;
      this.certificateAuthority = certificate.certificateAuthority;
      console.log('x' + certificate.certificateName);
    }

    for (const experience of employee.experiences) {
      this.organisation = experience.organisation;
      this.role = experience.role;
    }


    for (const project of employee.projects) {
      this.title = project.title;
      this.description = project.description;
      this.projectUrl = project.projectUrl;
      this.role = project.role;
      this.skill = project.technologiesUsed.skill;
      this.level = project.technologiesUsed.level;
    }

    this.cityName = employee.location.currentLocation.cityName;
    this.stateName = employee.location.currentLocation.stateName;
  }
  public downloadPDF() {
    var doc = new jsPDF("p", "mm", "a4");
    let specialElementHandlers = {
      '#editor':function(element, renderer)  {
        return true;
      }
    };

    let body = this.body.nativeElement;
    doc.fromHTML(body.innerHTML, 15, 15, {
     'width': 150,
     'elementHandlers': specialElementHandlers
    });
    doc.save('resume.pdf');
  }
}
