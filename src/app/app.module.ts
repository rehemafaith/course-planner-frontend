import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course_module/course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentComponent } from './department_module/department-component/department/department.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FacultyComponent } from './faculty_module/faculty-component/faculty/faculty.component';
import { SemesterComponent } from './semester_module/semester-component/semester/semester.component';
import { UnitComponent } from './unit_module/unit-component/unit/unit.component';
import { PlannerComponent } from './planner_module/planner-component/planner/planner.component';
import { LoginComponentComponent } from './login_module/login-component/login-component.component';
import { SignupComponentComponent } from './login_module/signup-component/signup-component.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    DepartmentComponent,
    FacultyComponent,
    SemesterComponent,
    UnitComponent,
    PlannerComponent,
    LoginComponentComponent,
    SignupComponentComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    NgbModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
