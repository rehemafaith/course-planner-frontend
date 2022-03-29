import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FacultyService } from '../../facult-service/faculty.service';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Faculty } from '../../facult-service/faculty';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  facultyForm: FormGroup;
  FacultyList: any = [];
  FacultyArr: any = [];
  term:string;
  p: number = 1; 
  closeResult: string;
  editForm = {
    facultyId: 0,
    facultyName: '',
    facultyDesc: ''
   
  }
  constructor(
    public facultyservice:FacultyService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchFaculty();
    this.addFaculty();
  }
  fetchFaculty() {
    return this.facultyservice.getFaculty().subscribe((data: {}) => {
      this.FacultyList = data;
    
    })
  }
  addFaculty() {
    this.facultyservice.getFaculty().subscribe((data: {}) => {
      this.FacultyList = data;
   
     
    })
    this.facultyForm= this.fb.group({
      facultyName: [''],
      facultyDesc: ['']
    })
  }
  submitForm() {
    this.facultyservice.createFaculty(this.facultyForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/faculty'))
      this.toastr.success('Success!', 'New Faculty added!');
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
  onEdit(f: NgForm) {
    this.facultyservice.updateFaculty(this.editForm).subscribe(
      (response: Faculty) => {
        this.toastr.success('Success!', 'Faculty updated!');
        this.fetchFaculty();
        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }
  openEdit(targetModal, faculty: Faculty) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    
    this.editForm = faculty;

    
    (<HTMLElement>document.getElementById('facultyId')).setAttribute('value', (faculty.facultyId).toString());
    (<HTMLElement>document.getElementById('facultyId')).setAttribute('data-target',(faculty.facultyId).toString());
    (<HTMLElement>document.getElementById('facultyName')).setAttribute('value', faculty.facultyName);
    (<HTMLElement>document.getElementById('facultyDesc')).setAttribute('value', faculty.facultyDesc);
   
    
  }
 
  deleteFaculty(id){
   
    return this.facultyservice.DeleteFaculty(id).subscribe(res=>{
      this.toastr.success('Success!', 'Faculty deleted!');
      this.fetchFaculty();
      
    });
  }
}
