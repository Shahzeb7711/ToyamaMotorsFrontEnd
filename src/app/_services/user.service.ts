import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UserEntity } from '../_model/user.model';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class UserService {
  
  private domain : string | undefined;

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {
    this.domain = environment.domain;
  }

  public login(loginData: any) {
    return this.httpclient.post(`${this.domain}api/auth/v1/signin`, loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(`${this.domain}forUser`, {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(`${this.domain}forAdmin`, {
      responseType: 'text',
    });
  }

public roleMatch(allowedRoles: string[]): boolean {
  const userRoles: string[] = this.userAuthService.getRoles();

  if (Array.isArray(userRoles) && Array.isArray(allowedRoles) && userRoles.length > 0) {
      console.log('User roles', userRoles);
      console.log('Allowed roles', allowedRoles);
      return userRoles.some(role => allowedRoles.includes(role));
  }
  
  return false;
}

public createUser(userDetails: UserEntity) {
  const url = `${this.domain}api/auth/v1/signup`;

  return this.httpclient.post<string>(url, userDetails).pipe(
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
      
      `body was: ${error.error} message: ${error.error.message}`)
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
}

getAllUser(){
  return this.httpclient.get<UserEntity[]>(`${this.domain}api/v1/user/`);
}

// private baseUrl = 'http://localhost:8080/api/v1/user/';
// activateProduct(id: any): Observable<any> {
//   return this.httpclient.put(`${this.baseUrl}/activate/${id}`, null)
//     .pipe(
//       catchError(error => {
//         let errorMessage = 'An error occurred while deactivating the product.';
//         if (error.error instanceof ErrorEvent) {
//           // Client-side error
//           errorMessage = error.error.message;
//         } else {
//           // Server-side error
//           errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
//         }
//         console.error(errorMessage);
//         return throwError(errorMessage);
//       })
//     );
// }

// deactivateProduct(id: any): Observable<any> {
//   return this.httpclient.put(`${this.baseUrl}/deactivate/${id}`, null)
//     .pipe(
//       catchError(error => {
//         let errorMessage = 'An error occurred while deactivating the product.';
//         if (error.error instanceof ErrorEvent) {
//           // Client-side error
//           errorMessage = error.error.message;
//         } else {
//           // Server-side error
//           errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
//         }
//         console.error(errorMessage);
//         return throwError(errorMessage);
//       })
//     );
// }


}