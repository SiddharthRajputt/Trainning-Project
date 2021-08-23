import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from'@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from '../shared/employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValues :FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData : any;
  showAdd: boolean;
  showUpdate: boolean;
  userid:number

  constructor(private formbuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValues = this.formbuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValues.reset();
    this.showAdd=true;
    this.showUpdate= false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.name=this.formValues.value.name;
    this.employeeModelObj.email=this.formValues.value.email;
    this.employeeModelObj.password=this.formValues.value.password;

    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      alert("Employee Added ")
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValues.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("something went wrong")
    })
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(id: string){
    this.api.deleteEmployee(id).subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row: any){
  this.showAdd=false;
    this.showUpdate= true;
    this.userid=row.user_id
    this.formValues.controls['name'].setValue(row.user_name);
    this.formValues.controls['email'].setValue(row.user_email);
    this.formValues.controls['password'].setValue(row.user_password);

   
    
  }
  updateEmployeeDetails(){
    debugger;
    this.api.updateEmployee(this.formValues.value,this.userid ).subscribe(res=>{
      alert("updatede successfully")
      console.log(res)
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValues.reset();
      this.getAllEmployee();
    })
  }
}
