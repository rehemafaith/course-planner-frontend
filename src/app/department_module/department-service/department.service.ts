import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Department } from './department';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
// Base url
baseurl = 'http://localhost:8080/planner/department';

  constructor(private http: HttpClient) {}
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      
    })
  }
  getDepartment(): Observable<Department[]>{
    const endpoint = 'fetchDepartment';
    return this.http.get<Department[]>(`${this.baseurl}/${endpoint}`).pipe(
      retry(1),  
      catchError(this.errorHandl)
    )
   
  
  }
  // POST
createDepartment(data:Department): Observable<Department> {
  
  return this.http.post<Department>(this.baseurl + '/createDepartment/', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
// DELETE
DeleteDepartment(data:Department): Observable<Department> {
  return this.http.post<Department>(this.baseurl + '/deleteDepartment/', {departmentId:data} , this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
//UPDATE
updateDepartment(data:Department): Observable<Department> {
  return this.http.post<Department>(this.baseurl + '/updateDepartment/', JSON.stringify(data), this.httpOptions)
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
