import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent {
  couponForm! : FormGroup;
  
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.couponForm = this.fb.group({
      name: [null, [Validators.required]], 
      code: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]]
    })
  }

  addCoupon(){
    if(this.couponForm.valid){
      this.adminService.addCoupon(this.couponForm.value).subscribe({
        next : (res) => {
          if(res.id != null){
            this.snackBar.open("Coupon posted successfully", "Close", {duration:5000})
            this.router.navigateByUrl('/admin/dashboard');
          }
        }, 
        error: (err) => {
          console.log(err)
          this.snackBar.open(err.message, 'ERROR', {duration: 5000})
        }
      })
    }else{
      this.couponForm.markAllAsTouched();
    }
  }
}
