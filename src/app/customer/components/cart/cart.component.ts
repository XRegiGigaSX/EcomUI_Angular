import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { PlaceOrderComponent } from '../place-order/place-order.component';
// import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: any[] = [];
  order: any = {};

  couponForm! : FormGroup
  
  constructor(
    private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
  ){}

  ngOnInit() : void{
    this.couponForm = this.fb.group({
      code : [null, [Validators.required]]
    })
    this.getCart();
  }

  applyCoupon(){
    this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe({
      next : (res) => {
        this.snackbar.open("Coupon applied successfully!", "Close", {duration: 3000});
        this.getCart();
      },
      error : (err) => {
        this.snackbar.open(err.error, "Close", {duration: 3000}); 
      }
    })
  }

  getCart(){
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe({
      next : (res) => {
        this.order = res
        res.cartItems.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.cartItems.push(element)
        })
      }
      
    })
  }

  increaseQuantity(productId: any){
    this.customerService.increaseProductQuantity(productId).subscribe({
      next: (res) => {
        this.snackbar.open("Product quantity increased", "Close", {duration: 3000});
        this.getCart();
      }
    })
  }

  decreaseQuantity(productId: any){
    this.customerService.decreaseProductQuantity(productId).subscribe({
      next: (res) => {
        this.snackbar.open("Product quantity decreased", "Close", {duration: 3000});
        this.getCart();
      }
    })
  }

  placeOrder(){
    this.dialog.open(PlaceOrderComponent);
  }
}
