import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products: any[] = [];

  searchProductsForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
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
    this.customerService.getAllProducts().subscribe({
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
    
    this.customerService.getAllProductsByName(title).subscribe({
      next: (res) => {
        res.forEach(el => {
          el.processedImg = 'data:image/jpeg;base64,'+ el.byteImg;
          this.products.push(el);
        })
      }
    })
  }

  addToCart(id: any){
    console.log("add to cart dashboard 1")
    this.customerService.addToCart(id).subscribe({
      next: (res) => {
        console.log("add to cart dashboard 2")
        this.snackbar.open("Product added to cart!", "Close", {duration: 5000})
      }
    })
  }
}
