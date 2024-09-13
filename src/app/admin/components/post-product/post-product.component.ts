import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {

  productForm! : FormGroup;
  listOfCategories : any = [];
  selectedFile : File | null;
  imagePreview : string | ArrayBuffer | null; 

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ){}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void{
    this.productForm = this.fb.group({
      categoryId : [null, [Validators.required]],
      name : [null, [Validators.required]],
      price : [null, [Validators.required]],
      description : [null, [Validators.required]],
    })

    this.getAllCategories();
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe({
      next: (response) => {
        this.listOfCategories = response;
      }
    })
  }

  addProduct(): void{
    console.log("inside function")
    if(this.productForm.valid){
      console.log("inside form valid")
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);
      console.log("form validated")

      this.adminService.addProduct(formData).subscribe({
        next: (res) => {
          console.log("inside service")
          if(res){
            this.snackBar.open("Product Posted Successfully!", "Close", {duration: 5000});
          }
          this.router.navigateByUrl('/admin/dashboard');
        }, 
        error: (err) => {
          console.log(err)
          this.snackBar.open(err.message, 'ERROR', {duration: 5000})
        }
      })

    }else{
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }

}
