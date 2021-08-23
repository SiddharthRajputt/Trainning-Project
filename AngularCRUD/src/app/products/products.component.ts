import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ProductModel } from '../shared/product.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  formValues: FormGroup;
  productData: any;
  productModelObj: ProductModel = new ProductModel();
  showAdd: boolean;
  showUpdate: boolean;
  pro_id: number

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValues = this.formbuilder.group({
      pro_name: [''],
      description: [''],
      cat_id: [''],
      is_active: [''],
      created_by: [''],
      created_at: [''],
    })
    this.getAllProducts();
  }


  clickAddProduct() {
    this.formValues.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postProductDetails() {
    this.productModelObj.pro_name = this.formValues.value.pro_name;
    this.productModelObj.description = this.formValues.value.description;
    this.productModelObj.cat_id = this.formValues.value.cat_id;
    this.productModelObj.is_active = this.formValues.value.is_active;
    this.productModelObj.created_by = this.formValues.value.created_by;
    this.productModelObj.created_at = this.formValues.value.created_at;

    this.api.postProduct(this.productModelObj).subscribe(res => {
      console.log(res);
      alert("Product Added ")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValues.reset();
      this.getAllProducts();
    },
      err => {
        alert("something went wrong")
      })
  }

  getAllProducts() {
    this.api.getProducts().subscribe(res => {
      this.productData = res;
    });
  }
  deleteProduct(id: any) {
    this.api.deleteProduct(id).subscribe(res => {
      alert("Product Deleted");
      this.getAllProducts();
    })
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.pro_id = row.pro_id;
    this.formValues.controls['pro_name'].setValue(row.pro_name);
    this.formValues.controls['description'].setValue(row.description);
    this.formValues.controls['cat_id'].setValue(row.cat_id);
    this.formValues.controls['is_active'].setValue(row.is_active);
    this.formValues.controls['created_by'].setValue(row.created_by);
    this.formValues.controls['created_at'].setValue(row.created_at);



  }


  updateProduct() {
    this.api.updateProduct(this.formValues.value, this.pro_id).subscribe(res => {
      alert("updated successfully")
      console.log(res)
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValues.reset();
      this.getAllProducts();
    });
  }


}
