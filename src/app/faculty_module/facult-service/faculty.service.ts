import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Faculty } from './faculty'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class FacultyService {
// Base url
baseurl = 'http://localhost:8080/planner/faculty';

  constructor(private http: HttpClient) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      
    })
  }
  getFaculty(): Observable<Faculty[]>{
    const endpoint = 'fetchFaculty';
    return this.http.get<Faculty[]>(`${this.baseurl}/${endpoint}`).pipe(
      retry(1),  
      catchError(this.errorHandl)
    )
   
  
  }
    // POST
createFaculty(data:Faculty): Observable<Faculty> {
  
  return this.http.post<Faculty>(this.baseurl + '/createFaculty/', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
// DELETE
DeleteFaculty(data:Faculty): Observable<Faculty> {
  return this.http.post<Faculty>(this.baseurl + '/deleteFaculty/', {facultyId:data} , this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
//UPDATE
updateFaculty(data:Faculty): Observable<Faculty> {
  return this.http.post<Faculty>(this.baseurl + '/updateFaculty/', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}
      // Error handling
      errorHandl(error: HttpErrorResponse) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
     }
}
