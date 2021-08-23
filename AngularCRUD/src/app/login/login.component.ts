import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm:FormGroup
  constructor(private fb:FormBuilder,
    private service:ApiService,
    ) { }

  ngOnInit(): void {
    this.userForm=this.fb.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required)
    })
  }

  onSubmit(){
    console.log(this.userForm.value);
    this.service.login(this.userForm.value)
    
  }

}
