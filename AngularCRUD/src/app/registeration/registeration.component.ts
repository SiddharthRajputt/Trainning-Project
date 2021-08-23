import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {


  empform:FormGroup
  constructor(private fb:FormBuilder,
    private service:ApiService) { }

  ngOnInit() {

    this.empform=this.fb.group({
      name: new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required)  
    });
    }
  
    onSubmit(){
      this.service.Register(this.empform.value)
    }
  
  
  }
