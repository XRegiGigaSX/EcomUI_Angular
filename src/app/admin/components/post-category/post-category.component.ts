import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent {
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ){
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  ngOnInit(): void{
    
  }

  addCategory(): void{
  //   console.log("Pressed submit!");
  // console.log("Form Validity:", this.categoryForm.valid);
  // console.log("Form Errors:", this.categoryForm.errors);
  // console.log("Form Value:", this.categoryForm.value);
  // console.log("Name Control:", this.categoryForm.get('name').value, this.categoryForm.get('name').valid);
  // console.log("Description Control:", this.categoryForm.get('description').value, this.categoryForm.get('description').valid);

    if(this.categoryForm.valid){
      // console.log("category form validated")
      this.adminService.addCategory(this.categoryForm.value).subscribe({
        next: (res) => {
          // console.log("add category step 1.")
          this.snackBar.open('Category Posted Successfully', 'Close', {duration: 5000});
          this.router.navigateByUrl("/admin/dashboard");
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Close', {duration: 5000, panelClass: 'error-snackbar'});
        }
      })
    }else{
      // console.log("could not validate form")
      this.categoryForm.markAllAsTouched();
    }
  }
}
