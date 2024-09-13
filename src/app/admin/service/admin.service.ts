import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private userStorageService: UserStorageService) { }

  addCategory(categoryDto : any): Observable<any>{
    // console.log("add category ang service reached.")
    return this.http.post(BASIC_URL+'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addProduct(productDto : any): Observable<any>{
    // console.log("add category ang service reached.")
    return this.http.post(BASIC_URL+'api/admin/product', productDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  deleteProduct(productId : any): Observable<any>{
    console.log("del prod service reached.")
    return this.http.delete(BASIC_URL+`api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllCategories(): Observable<any>{
    // console.log("add category ang service reached.")
    return this.http.get(BASIC_URL+'api/admin/categories', {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProducts(): Observable<any>{
    // console.log("add category ang service reached.")
    return this.http.get(BASIC_URL+'api/admin/products', {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProductsByName(query: any): Observable<any>{
    // console.log("add category ang service reached.")
    return this.http.get(BASIC_URL+`api/admin/search/${query}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addCoupon(couponDto : any): Observable<any>{
    // console.log("add category ang service reached.")
    return this.http.post(BASIC_URL+'api/admin/coupons', couponDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getCoupons(): Observable<any>{
    // console.log("add category ang service reached.")
    return this.http.get(BASIC_URL+'api/admin/coupons',{
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    const token = UserStorageService.getToken();
    // console.log("creating http header " + token)
    return new HttpHeaders().set(
      'Authorization', `Bearer ${token}`
    )
  }
}
