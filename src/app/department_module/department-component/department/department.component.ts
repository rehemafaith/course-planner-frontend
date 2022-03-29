import { Component, OnInit, NgZone } from '@angular/core';
import { DepartmentService } from 'src/app/department_module/department-service/department.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from '../../department-service/department';
import { FacultyService } from 'src/app/faculty_module/facult-service/faculty.service';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  DepartmentList: any = [];
  FacultyList: any = [];
  departmentFacultyId : 0
  term:string;
  p: number = 1;
  // displayedColumns: string[] = ['departmentName', 'departmentDesc', 'Action'];
  // ELEMENT_DATA: Department[] = [];
  // dataSource = new  MatTableDataSource<Department>(this.ELEMENT_DATA);
  closeResult: string;
  editForm = {
    departmentId:0,
    departmentName: '',
    departmentDesc: '',
    departmentFacultyId: 0
     
  }
  constructor(
    public departmentService: DepartmentService,
    public facultyservice: FacultyService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.addDepartment();
  }

  loadDepartments() {
    return this.departmentService.getDepartment().subscribe((data: {}) => {
      this.DepartmentList = data;
  
    
    })
  }
  fetchFaculty() {
    return this.facultyservice.getFaculty().subscribe((data: {}) => {
      this.FacultyList = data;
    
    })
  }
  addDepartment() {
    this.fetchFaculty();
    this.departmentService.getDepartment().subscribe((data: {}) => {
      this.DepartmentList = data;
      const departmentId = this.DepartmentList.departmentId
     
    })
    this.departmentForm= this.fb.group({
      departmentName: [''],
      departmentDesc: [''],
      departmentFacultyId: this.departmentFacultyId
     
    })
  }
 
  submitForm() {
    this.departmentService.createDepartment(this.departmentForm.value).subscribe(res => {
     
      this.ngZone.run(() => this.router.navigateByUrl('/department'))
      this.toastr.success('Success!', 'Department created!');
      this.ngOnInit();
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
  deleteDepartment(id){
   
    return this.departmentService.DeleteDepartment(id).subscribe(res=>{
      this.toastr.success('Success!', 'Department deleted!');
      this.loadDepartments();
      
    });
  }
  onEdit(f: NgForm) {
    this.departmentService.updateDepartment(this.editForm).subscribe(
      (response: Department) => {
        this.toastr.success('Success!', 'Department updated!');
        this.loadDepartments();
        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }
  openEdit(targetModal, department: Department) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    
    this.editForm = department;

    
    (<HTMLElement>document.getElementById('departmentId')).setAttribute('value', (department.departmentId).toString());
    (<HTMLElement>document.getElementById('departmentId')).setAttribute('data-target',(department.departmentId).toString());
    (<HTMLElement>document.getElementById('departmentName')).setAttribute('value', department.departmentName);
    (<HTMLElement>document.getElementById('departmentDesc')).setAttribute('value', department.departmentDesc);
    (<HTMLElement>document.getElementById('departmentFacultyId')).setAttribute('value', (department.departmentFacultyId).toString());
    
  }
}
