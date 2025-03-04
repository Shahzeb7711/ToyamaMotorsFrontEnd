import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Blog } from '../_model/blog.model';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  private domain : string | undefined;

  constructor(private http: HttpClient) { 

    this.domain = environment.domain;
  }
  addBlogs(blogs : FormData) : Observable<string> {
    const url = `${this.domain}api/v1/blog/`;

    return this.http.post<string>(url, blogs).pipe(
      tap(response => console.log('Response:', response)),
      catchError(this.handleError)
    )
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


  public getAllBlogs(pageNumber : number) {
    return this.http.get<Blog[]>(`${this.domain}api/v1/blog/?pageNumber=${pageNumber}`)
  }

  public getBlogById(blogId : any){
    return this.http.get<Blog>(`${this.domain}api/v1/blog/${blogId}`)
  }

}
