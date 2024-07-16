import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Make } from '../_model/make.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MakeServiceService {

  private domain : string | undefined;
  constructor(private http: HttpClient) { 
    this.domain = environment.domain;
  }

  addMake(make: Make): Observable<string> {
    const url = `${this.domain}api/v1/make/`;

    return this.http.post<string>(url, make).pipe(
      tap(response => console.log('Response:', response)), // Log the response
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  public getAllMakes() {
    return this.http.get<Make[]>(`${this.domain}api/v1/make/`)
  }

}
