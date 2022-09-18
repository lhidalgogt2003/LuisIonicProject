/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Student, Beer } from '../models/app-models';
import { httpOptions } from './http-headers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // Get students data
  getStudentList(): Observable<Student> {
    return this.http
      .get<Student>(environment.apiUrl + environment.students)
      .pipe(
        retry(2),
      );
  }
  // Delete student
  deleteStudent(id) {
    return this.http
      .delete<Student>(environment.apiUrl + environment.students + id, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get beers data
  getBeersList(): Observable<Beer> {
    return this.http
      .get<Beer>(environment.apiUrl + environment.beers)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteBeer(id) {
    return this.http
      .delete<Beer>(environment.apiUrl + environment.beers + id, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createStudent(item): Observable<Student> {
    const form = {
      data: {
        name: item.name,
        age: item.age,
        address: item.address,
      }
    };
    console.log(form);
    return this.http
      .post<Student>(environment.apiUrl + environment.students, JSON.stringify(form), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Update item by id
  updateStudent(id, item): Observable<Student> {
    const form = {
      data: {
        name: item.name,
        age: item.age,
        address: item.address,
      }
    };
    return this.http
      .put<Student>(environment.apiUrl + environment.students + id, JSON.stringify(form), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getStudent(id): Observable<Student> {
    return this.http
      .get<Student>(environment.apiUrl + environment.students + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
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
    return throwError(
      'Something bad happened; please try again later.');
  };
}
