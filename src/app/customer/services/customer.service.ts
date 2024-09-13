import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any>{
    // console.log("add category ang service reached.")
    return this.http.get(BASIC_URL+'api/customer/products', {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProductsByName(query: any): Observable<any>{
    // console.log("add category ang service reached.")
    return this.http.get(BASIC_URL+`api/customer/search/${query}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addToCart(productId:any) : Observable<any>{
    console.log("add to cart service 1")
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL+'api/customer/cart', cartDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getCartByUserId() : Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL+`api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  applyCoupon(couponCode: any) : Observable<any>{
    const userId = UserStorageService.getUserId();

    return this.http.get(BASIC_URL+`api/customer/coupon/${userId}/${couponCode}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  placeOrder(orderDto: any) : Observable<any>{
    orderDto.userId = UserStorageService.getUserId();

    return this.http.post(BASIC_URL+`api/customer/placeOrder`, orderDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  increaseProductQuantity(productId:any) : Observable<any>{
    // console.log("add to cart service 1")
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL+'api/customer/addition', cartDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  decreaseProductQuantity(productId:any) : Observable<any>{
    // console.log("add to cart service 1")
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL+'api/customer/deduction', cartDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    const token = UserStorageService.getToken();
    console.log("creating http header " + token)
    return new HttpHeaders().set(
      'Authorization', `Bearer ${token}`
    )
  }
}
