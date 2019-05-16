import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { QueryData } from '../domain/QueryData';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = 'https://matchmaker-zuul.stackroute.in/query-service/matchmaker/v1/search';

  constructor(private httpClient: HttpClient) { }

  submitQueryDetails(queryData: QueryData): Observable<QueryData> {
    return this.httpClient.post<QueryData>(this.url, queryData, httpOptions).pipe(catchError(this.errorHandler));
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
}
