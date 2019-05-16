import { Injectable } from '@angular/core';
import { LocationSection } from '../location-dialog/domain/section';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Output } from '../outputclass/output';
import { CurrentCityResponse, Currentcities } from '../location-dialog/domain/currentcities';
import { PastCityResponse, Pastcities } from '../location-dialog/domain/pastcities';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/location';

  constructor(private httpClient: HttpClient) { }

  addLocationDetails(section: LocationSection): Observable<Output> {
    console.log(section);
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
  searchcurrentcities(filter: {name: string} = {name: ''}, page = 1): Observable<CurrentCityResponse> {
    return this.httpClient.get<CurrentCityResponse>('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisLocation/' + filter.name)
    .pipe(
      tap((response: CurrentCityResponse) => {
        response.locations = response.locations
          .map(currentcities => new Currentcities(currentcities.name, currentcities.id));
        return response;
      })
      );
  }
  searchpastcities(filter: {name: string} = {name: ''}, page = 1): Observable<PastCityResponse> {
    return this.httpClient.get<PastCityResponse>('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisLocation/' + filter.name)
    .pipe(
      tap((response: PastCityResponse) => {
        response.locations = response.locations
          .map(pastcities => new Pastcities(pastcities.name, pastcities.id));
        return response;
      })
      );
  }
}
