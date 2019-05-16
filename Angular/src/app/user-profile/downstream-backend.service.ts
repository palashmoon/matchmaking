import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { doesNotThrow } from 'assert';
import { throwError, Observable } from 'rxjs';
import { EducationSection } from '../add-module/education-dialog/domain/educationsection';
import { SkillSection } from '../add-module/skill-dialog/domain/skillsection';
import { ExperienceSection } from '../add-module/experience-dialog/domain/section';
import { LocationSection } from '../add-module/location-dialog/domain/section';
import { CertificateSection } from '../add-module/certificate-dialog/domain/certificatesection';
import { ProjectSection } from '../add-module/project-dialog/domain/projectsection';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class DownstreamBackendService {

_url = 'https://matchmaker-zuul.stackroute.in/downstream-service/matchmaker/v1/employees';
delete_url = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/education/';
delete_url1= 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/skills/';
delete_url2= 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/location/';
delete_url3= 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/experience/';
delete_url4= 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/project/';
delete_url5= 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/certificate/';

  constructor(private httpClient: HttpClient) { }

   getEmployee(employeeId: String) {
     const _url = this._url + '/' + employeeId;
     return this.httpClient.get(_url).pipe(catchError(this.errorHandler));
   }

   errorHandler(error: Error) {
     return throwError(error.message);
   }

  deleteEducationDetails(section: EducationSection){
    console.log(section);
    return this.httpClient.post<any>(this.delete_url, section, httpOptions).pipe(catchError(this.errorHandler));
  }

  deleteSkillsDetails(section: SkillSection){
    return this.httpClient.post<any>(this.delete_url1, section, httpOptions).pipe(catchError(this.errorHandler));
  }
  deleteExperienceDetails(section: ExperienceSection){
    return this.httpClient.post<any>(this.delete_url3, section, httpOptions).pipe(catchError(this.errorHandler));
  }
  deleteLocationDetails(section:  LocationSection){
    return this.httpClient.post<any>(this.delete_url2, section, httpOptions).pipe(catchError(this.errorHandler));
  }
  deleteCerificateDetails(section: CertificateSection){
    return this.httpClient.post<any>(this.delete_url5, section, httpOptions).pipe(catchError(this.errorHandler));
  }
  deleteProjectDetails(section: ProjectSection){
    return this.httpClient.post<any>(this.delete_url4, section, httpOptions).pipe(catchError(this.errorHandler));
  }

  updateEducationDetails(section: EducationSection){
    return this.httpClient.post<any>(this.delete_url, section, httpOptions).pipe(catchError(this.errorHandler));
  }

  updateSkillsDetails(section: SkillSection){
    return this.httpClient.post<any>(this.delete_url1, section, httpOptions).pipe(catchError(this.errorHandler));
  }
  updateExperienceDetails(section: ExperienceSection){
    return this.httpClient.post<any>(this.delete_url3, section, httpOptions).pipe(catchError(this.errorHandler));
  }
  updateLocationDetails(section:  LocationSection){
    return this.httpClient.post<any>(this.delete_url2, section, httpOptions).pipe(catchError(this.errorHandler));
  }
  updateCerificateDetails(section: CertificateSection){
    return this.httpClient.post<any>(this.delete_url5, section, httpOptions).pipe(catchError(this.errorHandler));
  }
  updateProjectDetails(section: ProjectSection){
    return this.httpClient.post<any>(this.delete_url4, section, httpOptions).pipe(catchError(this.errorHandler));
  }
}
