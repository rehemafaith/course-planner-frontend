import { Component, OnInit, NgZone } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PlannerService } from '../../planner-service/planner.service';
import { Planner } from '../../planner-service/planner';
import { CourseService } from 'src/app/course_module/course-service/course.service';
import { UnitService } from 'src/app/unit_module/unit-service/unit.service';
import { SemesterService  } from 'src/app/semester_module/semester-service/semester.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  plannerForm: FormGroup;
  PlannerList: any = [];
  UnitList: any = [];
  CourseList: any = [];
  SemesterList: any =[];
  plannerUnitId:0;
  plannerCourseId:0;
  plannerSemesterId:0;

  PlannerArr: any = [];
  closeResult: string;
  editForm = {
    plannerId:0,
    plannerSemesterName: '',
    plannerCourseName: '',
    plannerUnitName: '',
    plannerCourseId:0,
    plannerSemesterId:0,
    plannerUnitId:0
   
  }
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public plannerService: PlannerService,
    public unitService: UnitService,
    public courseService: CourseService,
    public semesterService: SemesterService
  ) { }

  ngOnInit(): void {
    this.fetchPlanner();
    this.addPlanner();
  }

  fetchPlanner() {
    return this.plannerService.getPlanner().subscribe((data: {}) => {
      this.PlannerList = data;
      
    });
  }

  fetchUnit(){
    return this.unitService.getUnit().subscribe((data: {}) =>{
      this.UnitList = data;
     
    });
  }

  fetchCourse(){
    return this.courseService.getCourse().subscribe((data: {}) => {
      this.CourseList = data;
    });
  }
  fetchSemester(){
    return this.semesterService.getSemester().subscribe((data: {}) =>{
      this.SemesterList = data;
    });
  }
  addPlanner() {
   this.fetchCourse();
   this.fetchSemester();
   this.fetchUnit();
   this.plannerForm= this.fb.group({
    plannerCourseId:this.plannerCourseId,
    plannerSemesterId:this.plannerSemesterId,
    plannerUnitId: this.plannerUnitId
    })
  }
  
  submitForm() {

    this.plannerService.createPlanner(this.plannerForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/planner'))
      this.toastr.success('Success!', 'New Planner added!');
      this.ngOnInit();
      console.log(this.plannerForm.value);
    },
    (error: HttpErrorResponse) => {
            alert(error.message);
            this.toastr.error('Unsuccessful', error.message);
            
           }
    );
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
  deletePlanner(id){
   
    return this.plannerService.DeletePlanner(id).subscribe(res=>{
      this.toastr.success('Success!', 'Planner deleted!');
      this.fetchPlanner();
      
    });
  }

}
