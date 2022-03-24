import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Course } from './course';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
 // Base url
 baseurl = 'http://localhost:8080/planner/course';
   
  constructor(private http: HttpClient) { }
   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      
    })
  }
  getCourse(): Observable<Course[]>{
    const endpoint = 'fetchCourse';
    return this.http.get<Course[]>(`${this.baseurl}/${endpoint}`).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
    
  
  
  }
// POST
createCourse(data:Course): Observable<Course> {
  
  return this.http.post<Course>(this.baseurl + '/createCourse/', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
// DELETE
DeleteCourse(data:Course): Observable<Course> {
  return this.http.post<Course>(this.baseurl + '/deleteCourse/', {courseId:data} , this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
} 
//UPDATE
updateCourse(data:Course): Observable<Course> {
  return this.http.post<Course>(this.baseurl + '/updateCourse/', JSON.stringify(data), this.httpOptions)
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
