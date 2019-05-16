import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private _url = 'https://matchmaker-zuul.stackroute.in/downstream-service/matchmaker/v1/employees';
  private _url1 = 'https://matchmaker-zuul.stackroute.in/registration-service/api/v1/registration/user';
  constructor(private _http: HttpClient) {}

  submit(user: RegisterModel) {

    return this._http
      .post(this._url, {'userId': user.email, 'name' : user.name, 'email': user.email}, { responseType: 'text'} )
      .pipe(catchError(this.errorHandler));
  }
  submit1(user: RegisterModel) {
    return this._http
      .post(this._url1, user, { responseType: 'text'} )
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
