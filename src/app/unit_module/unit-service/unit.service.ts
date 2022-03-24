import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Unit} from './unit';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UnitService {

// Base url
baseurl = 'http://localhost:8080/planner/unit';
  constructor(private http: HttpClient) { }

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      
    })
  }
  getUnit(): Observable<Unit[]>{
    const endpoint = 'fetchUnit';
    return this.http.get<Unit[]>(`${this.baseurl}/${endpoint}`).pipe(
      retry(1),  
      catchError(this.errorHandl)
    )
   
  
  }
    // POST
createUnit(data:Unit): Observable<Unit> {
  
  return this.http.post<Unit>(this.baseurl + '/createUnit/', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
// DELETE
DeleteUnit(data:Unit): Observable<Unit> {
  return this.http.post<Unit>(this.baseurl + '/deleteUnit/', {unitId:data} , this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
//UPDATE
updateUnit(data:Unit): Observable<Unit> {
  return this.http.post<Unit>(this.baseurl + '/updateUnit/', JSON.stringify(data), this.httpOptions)
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
