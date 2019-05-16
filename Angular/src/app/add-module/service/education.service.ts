import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { EducationSection } from '../education-dialog/domain/educationsection';
import { Output } from '../outputclass/output';
import { IQualificationResponse, Qualificationn } from '../education-dialog/domain/qualificationn';
import { Institute, InstituteResponse } from '../education-dialog/domain/institute';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class EducationService {

  url = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/education/';

  constructor(private httpClient: HttpClient) { }

  addEducationDetails(section: EducationSection): Observable<Output> {
    return this.httpClient.post<Output>(this.url, section, httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  searchqualification(filter: {name: string} = {name: ''}, page = 1): Observable<IQualificationResponse> {
    return this.httpClient.get<IQualificationResponse>('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisEducation/qualification/' + filter.name)
    .pipe(
      tap((response: IQualificationResponse) => {
        response.qualifications = response.qualifications
          .map(qualification => new Qualificationn(qualification.id, qualification.name));
        return response;
      })
      );
  }
  searchinstitution(filter: {name: string} = {name: ''}, page = 1): Observable<InstituteResponse> {
    return this.httpClient.get<InstituteResponse>('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisEducation/education/' + filter.name)
    .pipe(
      tap((response: InstituteResponse) => {
        response.educations = response.educations
          .map(institute => new Institute(institute.id, institute.name));
        return response;
      })
      );
  }
}
