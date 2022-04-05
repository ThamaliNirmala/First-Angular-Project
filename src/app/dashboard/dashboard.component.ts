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
      },
      err=>{
        alert("Something went Wrong")
      })
  }

}
 