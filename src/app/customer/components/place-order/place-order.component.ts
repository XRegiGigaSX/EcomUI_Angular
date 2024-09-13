import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {
  orderForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(){
    this.orderForm = this.fb.group({
      orderDescription: [null],
      address: [null, [Validators.required]]
    })
  }

  placeOrder(){
    this.customerService.placeOrder(this.orderForm.value).subscribe({
      next: (res) => {
        if(res.id != null){
          this.snackBar.open("Order Placed Successfully!", "Close", {duration:4000});
          this.router.navigateByUrl('/customer/my-orders');
          this.closeForm();
        }else{
          this.snackBar.open("Something went wrong. Please try again!", "Close", {duration:4000})
        }
      }
    })
  }

  closeForm(){
    this.dialog.closeAll();
  }
}
