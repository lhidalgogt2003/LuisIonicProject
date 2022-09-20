/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Student, User } from '../models/app-models';
import { httpOptions } from './http-headers';
import { IonStorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private ionStorage: IonStorageService
  ) { }

  postLogin(form): Observable<User> {
    const data = {
      identifier: form.email,
      password: form.password
    };
    return this.http
      .post<Student>(environment.apiUrl + environment.login, data, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  postRegister(form): Observable<User> {
    const data = {
      first_name: form.first_name,
      last_name: form.last_name,
      username: form.username,
      email: form.email,
      password: form.password
    };
    console.log(data);
    return this.http
      .post<Student>(environment.apiUrl + environment.register, data, httpOptions)
      .pipe(
        retry(2),
        catchError((res: any) => this.handleError(res.error))
      );
  }
  logout() {
    this.ionStorage.storageRemove('token');
    this.ionStorage.storageRemove('user');
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error?.status}, ` +
        `body was: ${error.error?.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
