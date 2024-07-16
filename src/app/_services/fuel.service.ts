import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Fuel } from '../_model/fuel.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  private domain : string | undefined;
  constructor(private http: HttpClient) {
    this.domain = environment.domain;
   }

  addFuel(fuel: Fuel): Observable<string> {
    const url = `${this.domain}api/v1/fuel/`

    return this.http.post<string>(url, fuel).pipe(
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

  public getAllFuelTypes() {
    return this.http.get<Fuel[]>(`${this.domain}api/v1/fuel/`)
  }
}
