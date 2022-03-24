import { Component, OnInit, NgZone } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UnitService } from '../../unit-service/unit.service';
import { Unit } from '../../unit-service/unit';
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  unitForm: FormGroup;
  UnitList: any = [];
  UnitArr: any = [];
  closeResult: string;
  editForm = {
    unitId:0,
    unitName: '',
    unitCode: '',
    courseName: '',
    unitRank:0,
    unitSpecialization: '',
    unitCourseId:0
   
  }
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public unitService: UnitService
  ) { }

  ngOnInit(): void {
    this.fetchUnit();
    this.addUnit();
  }
  fetchUnit() {
    return this.unitService.getUnit().subscribe((data: {}) => {
      this.UnitList = data;
      console.log(this.UnitList)
    })
  }


  addUnit() {
    this.unitService.getUnit().subscribe((data: {}) => {
      this.UnitList = data;
    })
    this.unitForm= this.fb.group({
      unitId:0,
      unitName: [''],
      unitCode: [''],
      courseName: [''],
      unitRank:0,
      unitSpecialization: [''],
      unitCourseId:0
    })
  }
  submitForm() {
    this.unitService.createUnit(this.unitForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/unit'))
      this.toastr.success('Success!', 'New Unit added!');
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
    this.unitService.updateUnit(this.editForm).subscribe(
      (response: Unit) => {
        this.toastr.success('Success!', 'Semester updated!');
        this.fetchUnit();
        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }
  openEdit(targetModal, unit: Unit) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    
    this.editForm = unit;

    
    (<HTMLElement>document.getElementById('unitId')).setAttribute('value', (unit.unitId).toString());
    (<HTMLElement>document.getElementById('unitId')).setAttribute('data-target',(unit.unitId).toString());
    (<HTMLElement>document.getElementById('unitName')).setAttribute('value', unit.unitName);
    (<HTMLElement>document.getElementById('unitCode')).setAttribute('value', unit.unitCode);
    (<HTMLElement>document.getElementById('unitRank')).setAttribute('value', (unit.unitRank).toString());
    (<HTMLElement>document.getElementById('unitSpecialization')).setAttribute('value', unit.unitSpecialization);
    (<HTMLElement>document.getElementById('courseName')).setAttribute('value', unit.courseName);
   
    
  }
 
  deleteUnit(id){
   
    return this.unitService.DeleteUnit(id).subscribe(res=>{
      this.toastr.success('Success!', 'Unit deleted!');
      this.fetchUnit();
      
    });
  }
  
}
