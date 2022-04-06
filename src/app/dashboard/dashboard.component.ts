import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { StudentModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup;
  studentModelObj : StudentModel = new StudentModel();
  studentData !: any;
  showAdd !: boolean;
  showUpdate !: boolean
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      contact : [''],
      gpa : ['']
    })
    this.getAllStudent();
  }
  clickAddStudent(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postStudentDetails(){
      this.studentModelObj.firstName = this.formValue.value.firstName;
      this.studentModelObj.lastName = this.formValue.value.lastName;
      this.studentModelObj.email = this.formValue.value.email;
      this.studentModelObj.contact = this.formValue.value.contact;
      this.studentModelObj.gpa = this.formValue.value.gpa;

      this.api.postStudent(this.studentModelObj)
      .subscribe(res=>{
        console.log(res);
        alert("Student Added Successfully")
        let ref = document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getAllStudent();
      },
      err=>{
        alert("Something went Wrong")
      })
  }
  getAllStudent(){
    this.api.getStudent()
    .subscribe(res=>{
      this.studentData = res;
    })
  }
  deleteStudent(row : any){
    this.api.deleteStudent(row.id)
    .subscribe(res=>{
      alert("Successfully Student Record Deleted");
      this.getAllStudent();
    })
  }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['contact'].setValue(row.contact)
    this.formValue.controls['gpa'].setValue(row.gpa)
  }
  updateStudentDetails(){
    this.studentModelObj.firstName = this.formValue.value.firstName;
      this.studentModelObj.lastName = this.formValue.value.lastName;
      this.studentModelObj.email = this.formValue.value.email;
      this.studentModelObj.contact = this.formValue.value.contact;
      this.studentModelObj.gpa = this.formValue.value.gpa;

      this.api.updateStudent(this.studentModelObj, this.studentModelObj.id)
      .subscribe(res=>{
        alert("Student Details Updated Successfully");
        let ref = document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getAllStudent();
      })
  }

}
 