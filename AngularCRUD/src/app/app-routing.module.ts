import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CategoryComponent } from './category/category.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import{RegisterationComponent} from './registeration/registeration.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {path: '',component:LoginComponent, pathMatch:'full'},
  {path:'dashboard', 
  component:SidenavComponent,
  children:[
    {path:'',component:EmployeeDashboardComponent},
    {path:'products', component:ProductsComponent,canActivate:[AuthGuard]},
    {path:'category', component:CategoryComponent,canActivate:[AuthGuard]}
  ]},
  {path:'register', component:RegisterationComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
