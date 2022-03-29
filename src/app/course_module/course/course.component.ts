import { Component, OnInit, NgZone } from '@angular/core';
import { CourseService } from '../course-service/course.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../course-service/course'; 
import { DepartmentService } from 'src/app/department_module/department-service/department.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = ['courseName', 'courseDesc'];
  courseForm: FormGroup;
  p: number = 1
  courseDepartmentId :0;
  CourseList: any = [];
  CourseArr: any = [];
  term:string;
  DepartmentList: any = [];
  datasource = this.CourseList;
  closeResult: string;
  editForm = {
    courseId: 0,
     courseName: '',
     courseDesc: '',
     courseDepartmentId: 0,
     courseDepartmentName:''
     
  }
  constructor(
    public courseService: CourseService,
    public departmentService : DepartmentService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchCourses();
    this.addCourse();
    
  }

 
  
   fetchCourses() {
    return this.courseService.getCourse().subscribe((data: {}) => {
      this.CourseList = data;
     
    })
  }
  fetchDepartments() {
    return this.departmentService.getDepartment().subscribe((data: {}) => {
      this.DepartmentList = data;
      
    
    })
  }
  // updateCourse(){
  //   this.editForm = this.fb.group({
      
  //     courseName: [''],
  //     courseDesc: [''],
  //     courseDepartmentId:['']
  //   })
  // }
  addCourse() {
    this.fetchDepartments();
    this.courseService.getCourse().subscribe((data: {}) => {
      this.CourseList = data;
      const courseId = this.CourseList.course_id
     
    })
    this.courseForm = this.fb.group({
      courseName: [''],
      courseDesc: [''],
      courseDepartmentId:this.courseDepartmentId,
      
    })
  }
 
  submitForm() {
    this.courseService.createCourse(this.courseForm.value).subscribe(res => {
     
      this.ngZone.run(() => this.router.navigateByUrl('/'))
      this.toastr.success('Success!', 'Course created!');
      this.ngOnInit();
      console.log(this.courseForm.value)
    },
    (error: HttpErrorResponse) => {
            alert(error.message);
            this.toastr.error('Unsuccessful', error.message);
            
           }
    );
  }
    
  onEdit(f: NgForm) {
    this.courseService.updateCourse(this.editForm).subscribe(
      (response: Course) => {
        console.log(response);
        this.fetchCourses();
        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }
  deletecourse(id){
   
    return this.courseService.DeleteCourse(id).subscribe(res=>{
      this.fetchCourses();
      
    });
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  openEdit(targetModal, course: Course) {
    console.log(course.courseDesc);
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    
    this.editForm = course;

    
    (<HTMLElement>document.getElementById('courseId')).setAttribute('value', (course.courseId).toString());
    (<HTMLElement>document.getElementById('courseId')).setAttribute('data-target',(course.courseId).toString());
    (<HTMLElement>document.getElementById('courseName')).setAttribute('value', course.courseName);
     
    (<HTMLElement>document.getElementById('courseDesc')).setAttribute('value', course.courseDesc);
    (<HTMLElement>document.getElementById('courseFacultyId')).setAttribute('value', (course.courseDepartmentId).toString());
     //  (<HTMLElement>document.getElementById('courseMobile')).setAttribute('value',( course.courseMobile).toString());
  }
}
