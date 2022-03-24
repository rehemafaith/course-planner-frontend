import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'course-planner';
  links = [
    { title: 'Course', fragment: 'course' },
    {title: 'Planner', fragment: 'planner'},
    { title: 'Department', fragment: 'department' },
    { title: 'Faculty', fragment: 'faculty' },
    { title: 'Semester', fragment: 'semester'},
    {title: 'Unit', fragment: 'unit'}
    
  ];
  constructor(public route: ActivatedRoute) {}
}
