import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseComponent} from '../app/course_module/course/course.component';
import {DepartmentComponent} from '../app/department_module/department-component/department/department.component';
import {FacultyComponent} from '../app/faculty_module/faculty-component/faculty/faculty.component';
import { SemesterComponent } from './semester_module/semester-component/semester/semester.component';
import { UnitComponent } from './unit_module/unit-component/unit/unit.component';
import { PlannerComponent } from './planner_module/planner-component/planner/planner.component';
const routes: Routes = [
  { path: '', 
    redirectTo: '/course',
    pathMatch: 'full' },
  { path: 'course',
    component: CourseComponent },

  { path: 'department',
    component: DepartmentComponent },
    
  { path: 'faculty',
    component: FacultyComponent },  

  { path: 'semester',
    component: SemesterComponent },

  {
    path: 'unit',
    component:UnitComponent
  },
  {
    path: 'planner',
    component:PlannerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
