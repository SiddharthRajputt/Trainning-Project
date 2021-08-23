import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { categoryModel } from '../shared/category.model';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  formValues: FormGroup;
  categoryData: any;
  categoryModelObj: categoryModel = new categoryModel();
  showAdd: boolean;
  showUpdate: boolean;
  cat_id: number

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValues = this.formbuilder.group({
      cat_name: [''],
      created_by: [''],
      created_at: ['']
    })
    this.getAllcategory();
  }

  clickAddcategory() {
    this.formValues.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postcategoryDetails() {
    this.categoryModelObj.cat_name = this.formValues.value.cat_name;
    this.categoryModelObj.created_by = this.formValues.value.created_by;
    this.categoryModelObj.created_at = this.formValues.value.created_at;

    this.api.postcategory(this.categoryModelObj).subscribe(res => {
      console.log(res);
      alert("category Added ")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValues.reset();
      this.getAllcategory();
    },
      err => {
        alert("something went wrong")
      })
  }

  getAllcategory() {
    this.api.getcategory().subscribe(res => {
      this.categoryData = res;
    });
  }
  deletecategory(id: any) {
    this.api.deletecategory(id).subscribe(res => {
      alert("category Deleted");
      this.getAllcategory();
    })
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.cat_id = row.cat_id;
    this.formValues.controls['cat_name'].setValue(row.cat_name);
    this.formValues.controls['created_by'].setValue(row.created_by);
    this.formValues.controls['created_at'].setValue(row.created_at);



  }


  updatecategory() {
    this.api.updatecategory(this.formValues.value, this.cat_id).subscribe(res => {
      alert("updated successfully")
      console.log(res)
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValues.reset();
      this.getAllcategory();
    });
  }
}

