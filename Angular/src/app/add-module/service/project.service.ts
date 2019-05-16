import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProjectSection } from '../project-dialog/domain/projectsection';
import { Observable, throwError } from 'rxjs';
import { DomainResponse, Domain } from '../project-dialog/domain/domain';
import { OrganisationResponse, Organisation } from '../project-dialog/domain/organisation';
import { ClientResponse, Client } from '../project-dialog/domain/client';
import { TechResponse, Tech } from '../project-dialog/domain/tech';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/project';

  constructor(private httpClient: HttpClient) { }

  addProjectDetails(section: ProjectSection): Observable<ProjectSection> {
    return this.httpClient.post<ProjectSection>(this.url, section, httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  searchdomain(filter: {name: string} = {name: ''}, page = 1): Observable<DomainResponse> {
    return this.httpClient.get<DomainResponse>('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisDomain/' + filter.name)
    .pipe(
      tap((response: DomainResponse) => {
        response.domains = response.domains
          .map(domain => new Domain(domain.name, domain.id));
        return response;
      })
      );
  }
  searchcompany(filter: {name: string} = {name: ''}, page = 1): Observable<OrganisationResponse> {
    return this.httpClient.get<OrganisationResponse>('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisOrganization/' + filter.name)
    .pipe(
      tap((response: OrganisationResponse) => {
        response.organizations = response.organizations
          .map(organisation => new Organisation(organisation.name, organisation.id))
          .filter(organisation => organisation.name.includes(filter.name));
        return response;
      })
      );
  }
  searchclient(filter: {name: string} = {name: ''}, page = 1): Observable<ClientResponse> {
    return this.httpClient.get<ClientResponse>('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisOrganization/' + filter.name)
    .pipe(
      tap((response: ClientResponse) => {
        response.organizations = response.organizations
          .map(client => new Client(client.name, client.id))
          .filter(client => client.name.includes(filter.name));
        return response;
      })
      );
  }
  searchtech(filter: {name: string} = {name: ''}, page = 1): Observable<TechResponse> {
    return this.httpClient.get<TechResponse>('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisSkill/' + filter.name)
    .pipe(
      tap((response: TechResponse) => {
        response.skills = response.skills
          .map(tech => new Tech(tech.name, tech.id));
        return response;
      })
      );
  }
}
