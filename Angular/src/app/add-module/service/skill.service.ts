import { catchError, tap } from 'rxjs/operators';
import { Output } from './../outputclass/output';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { SkillSection } from '../skill-dialog/domain/skillsection';
import { Observable, throwError } from 'rxjs';
import { SkillResponse, Skillauto } from '../skill-dialog/domain/skillauto';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class SkillService {

  url = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/skills';

  constructor(private httpClient: HttpClient) { }

  addSkillDetails(section: SkillSection): Observable<Output> {
    return this.httpClient.post<Output>(this.url, section, httpOptions).pipe(catchError(this.errorHandler));
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
  searchskills(filter: {name: string} = {name: ''}, page = 1): Observable<SkillResponse> {
    return this.httpClient.get<SkillResponse>('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisSkill/' + filter.name)
    .pipe(
      tap((response: SkillResponse) => {
        response.skills = response.skills
          .map(skill => new Skillauto(skill.name, skill.id));
        return response;
      })
      );
  }
}

