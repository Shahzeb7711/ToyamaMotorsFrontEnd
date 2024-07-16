import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../_model/contact.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private domain : string | undefined;
  constructor(private http: HttpClient) {
    this.domain = environment.domain;
   }

  addContact(contact: Contact): Observable<string> {
    const url = `${this.domain}api/v1/contact/`

    return this.http.post<string>(url, contact).pipe(
      tap(response => console.log('Response:', response)), 
      catchError(this.handleError)
    );
  }

  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  public getAllContacts() {
    return this.http.get<Contact[]>(`${this.domain}api/v1/contact/`)
  }
}
