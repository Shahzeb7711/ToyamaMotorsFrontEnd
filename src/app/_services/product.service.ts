import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private domain : string | undefined;
  constructor(private http: HttpClient) {
    this.domain = environment.domain;
   }

  addProduct(product: FormData): Observable<string> {
    const url = `${this.domain}api/v1/`;

    return this.http.post<string>(url, product).pipe(
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

  public getAllProducts(){
    return this.http.get<Product[]>(`${this.domain}api/v1/getAll?pageNumber`)
  }

  public getAllActivatedProducts(pageNumber: number, search: string="") {
    return this.http.get<Product[]>(`${this.domain}api/v1/find/all/active?pageNumber=${pageNumber}&searchKey=${search}`)
  }

  // public getAllActivatedProductsWithPagination(pageIndex: number): Product[] {
  //   return this.http.get<Product[]>("http://localhost:8080/api/v1/getActivated")
  // }

  public getProductById(productId: any) {
    return this.http.get<Product>(`${this.domain}api/v1/${productId}`)
  }

  // public deleteProduct(productId: number) {
  //   return this.http.put<Product[]>("http://localhost:8080/api/v1/", );
  // }

  activateProduct(productId: any): Observable<any> {
    return this.http.put(`${this.domain}api/v1/activate/${productId}`, null)
      .pipe(
        catchError(error => {
          let errorMessage = 'An error occurred while deactivating the product.';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = error.error.message;
          } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
          }
          console.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }

  deactivateProduct(productId: any): Observable<any> {
    return this.http.put(`${this.domain}api/v1/deactivate/${productId}`, null)
      .pipe(
        catchError(error => {
          let errorMessage = 'An error occurred while deactivating the product.';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = error.error.message;
          } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
          }
          console.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }




  updateProduct(product: FormData): Observable<string> {
    const url = `${this.domain}api/v1/`;

    return this.http.put<string>(url, product).pipe(
      tap(response => console.log('Response:', response)), // Log the response
      catchError(this.handleError)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const url = `${this.domain}api/v1/api/v1/products/search`;
    return this.http.post<Product[]>(url, keyword)
      .pipe(
        catchError(error => {
          console.error('Error searching for products:', error);
          throw error; // Let the error propagate
        })
      );
  }

}
