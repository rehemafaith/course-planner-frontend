import { Injectable } from '@angular/core';
import { Semester } from './semester';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  // Base url
baseurl = 'http://localhost:8080/planner/semester';
  constructor(private http: HttpClient) { }
   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      
    })
  }
  getSemester(): Observable<Semester[]>{
    const endpoint = 'fetchSemester';
    return this.http.get<Semester[]>(`${this.baseurl}/${endpoint}`).pipe(
      retry(1),  
      catchError(this.errorHandl)
    )
   
  
  }
    // POST
createSemester(data:Semester): Observable<Semester> {
  
  return this.http.post<Semester>(this.baseurl + '/createSemester/', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
// DELETE
DeleteSemester(data:Semester): Observable<Semester> {
  return this.http.post<Semester>(this.baseurl + '/deleteSemester/', {semesterId:data} , this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
//UPDATE
updateSemester(data:Semester): Observable<Semester> {
  return this.http.post<Semester>(this.baseurl + '/updateSemester/', JSON.stringify(data), this.httpOptions)
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
