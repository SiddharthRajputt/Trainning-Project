import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'AngularCRUD';
  auth: boolean;
  authListenerSubs:Subscription;
  userIsAuthenticated:boolean=false
  constructor(private authService:ApiService,
      private router:Router){}
  ngOnInit(){
    this.userIsAuthenticated=this.authService.getIsAuth();

    this.authListenerSubs=this.authService.getMessage()

     .subscribe(isAuthenticated=>{

        this.userIsAuthenticated=isAuthenticated;

     })
    this.authService.autoAuthUser();
  }
  logout(){
    this.authService.logout()
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
