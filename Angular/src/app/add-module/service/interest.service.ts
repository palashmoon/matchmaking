import { tap, catchError } from 'rxjs/operators';
import { InterestsSection } from './../interest-dialog/domain/section';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Output } from '../interest-dialog/domain/output';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  url1 = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/interest/';
  constructor(private httpClient: HttpClient) { }

  addInterestsDetails(section: InterestsSection): Observable<Output> {
    console.log(section);
    return this.httpClient.post<Output>(this.url1, section, httpOptions).pipe(catchError(this.errorHandler));
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

}
