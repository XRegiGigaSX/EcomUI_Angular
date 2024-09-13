import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];

  searchProductsForm!: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(){
    this.getAllProducts();

    this.searchProductsForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts(){
    this.products = [];
    this.adminService.getAllProducts().subscribe({
      next: (res) => {
        res.forEach(el => {
          el.processedImg = 'data:image/jpeg;base64,'+ el.byteImg;
          this.products.push(el);
        })
      }
    })
  }
  
  submitForm(){
    this.products = [];
    const title = this.searchProductsForm.get('title')!.value;
    
    this.adminService.getAllProductsByName(title).subscribe({
      next: (res) => {
        res.forEach(el => {
          el.processedImg = 'data:image/jpeg;base64,'+ el.byteImg;
          this.products.push(el);
        })
      }
    })
  }
  
    deleteProduct(productId:any){
      console.log("inside component function")
      this.adminService.deleteProduct(productId).subscribe({
        next: (res) => {
          if(res?.body == null){
            console.log(res);
            this.snackbar.open('Product deleted successfully.', 'Close', {duration: 3000})
            this.getAllProducts();
          } else {
            this.snackbar.open(res.message, 'Close', {duration: 3000, panelClass: 'error-snackbar'})
          }
        }
      })
    }
}
