import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Planner } from './planner';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  // Base url
  baseurl = 'http://localhost:8080/planner/planner';
  
  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      
    })
  }
  getPlanner(): Observable<Planner[]>{
    const endpoint = 'fetchPlanner';
    return this.http.get<Planner[]>(`${this.baseurl}/${endpoint}`).pipe(
      retry(1),  
      catchError(this.errorHandl)
    )
   
  
  }
    // POST
createPlanner(data:Planner): Observable<Planner> {
  
  return this.http.post<Planner>(this.baseurl + '/createPlanner/', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
// DELETE
DeletePlanner(data:Planner): Observable<Planner> {
  return this.http.post<Planner>(this.baseurl + '/deletePlanner/', {plannerId:data} , this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
//UPDATE
updatePlanner(data:Planner): Observable<Planner> {
  return this.http.post<Planner>(this.baseurl + '/updatePlanner/', JSON.stringify(data), this.httpOptions)
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
