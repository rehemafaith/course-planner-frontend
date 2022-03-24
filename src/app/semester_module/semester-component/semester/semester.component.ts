import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SemesterService } from '../../semester-service/semester.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Semester } from '../../semester-service/semester';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {
  semesterForm: FormGroup;
  SemesterList: any = [];
  SemesterArr: any = [];
  closeResult: string;
  editForm = {
    semesterId: 0,
    semesterName: '',
    semesterDesc: ''
   
  }
  constructor(
    public semesterService:SemesterService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchSemester();
    this.addSemester();
  }

  fetchSemester() {
    return this.semesterService.getSemester().subscribe((data: {}) => {
      this.SemesterList = data;
      console.log(this.SemesterList)
    })
  }

  addSemester() {
    this.semesterService.getSemester().subscribe((data: {}) => {
      this.SemesterList = data;
    })
    this.semesterForm= this.fb.group({
      semesterName: [''],
      semesterDesc: ['']
    })
  }
  submitForm() {
    this.semesterService.createSemester(this.semesterForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/semester'))
      this.toastr.success('Success!', 'New Semester added!');
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
    this.semesterService.updateSemester(this.editForm).subscribe(
      (response: Semester) => {
        this.toastr.success('Success!', 'Semester updated!');
        this.fetchSemester();
        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }
  openEdit(targetModal, semester: Semester) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    
    this.editForm = semester;

    
    (<HTMLElement>document.getElementById('semesterId')).setAttribute('value', (semester.semesterId).toString());
    (<HTMLElement>document.getElementById('semesterId')).setAttribute('data-target',(semester.semesterId).toString());
    (<HTMLElement>document.getElementById('semesterName')).setAttribute('value', semester.semesterName);
    (<HTMLElement>document.getElementById('semesterDesc')).setAttribute('value', semester.semesterDesc);
   
    
  }
 
  deleteSemester(id){
   
    return this.semesterService.DeleteSemester(id).subscribe(res=>{
      this.toastr.success('Success!', 'Semester deleted!');
      this.fetchSemester();
      
    });
  }
}
