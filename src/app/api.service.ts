import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
export class Student {
  id: number;
  name: string;
  age: string;
  address: string;
}

export class Beer {
  id: number;
  brand: string;
  description: string;
  price: number;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // API path
  base_path = 'http://localhost:1337/api/students';
  beer_path = 'http://localhost:1337/api/beers';
  constructor(private http: HttpClient) { }
  // Get students data
  getList(): Observable<Student> {
    return this.http
      .get<Student>(this.base_path)
      .pipe(
        retry(2),
      );
  }
  // Delete student
  deleteStudent(id) {
    return this.http
      .delete<Student>(this.base_path + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get beers data
  getBeers(): Observable<Beer> {
    return this.http
      .get<Beer>(this.beer_path)
      .pipe(
        retry(2),
      );
  }

  deleteBeer(id) {
    return this.http
      .delete<Beer>(this.beer_path + '/' + id, this.httpOptions)
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
      .post<Student>(this.base_path, JSON.stringify(form), this.httpOptions)
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
    console.log(form);
    return this.http
      .put<Student>(this.base_path + '/' + id, JSON.stringify(form), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getStudent(id): Observable<Student> {
    return this.http
      .get<Student>(this.base_path + '/' + id)
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