// import { Injectable } from '@angular/core';

// const TOKEN = "ecom-token";
// const USER = "ecom-user";

// @Injectable({
//   providedIn: 'root'
// })
// export class UserStorageService {

//   constructor() { }

//   public saveToken(token: string): void{
//     window.localStorage.removeItem(TOKEN);
//     window.localStorage.setItem(TOKEN, token);
//   }

//   public saveUser(user: any): void{
//     window.localStorage.removeItem(USER);
//     window.localStorage.setItem(USER, JSON.stringify(user));
//     // window.localStorage.setItem(USER, user);
//   }
  
//   static getUser(): any | null{
//     // console.log(JSON.parse(localStorage.getItem(USER)))
//     const user = localStorage.getItem(USER);
//     return user ? JSON.parse(user): null;
//   }
  
//   static getToken(): string{
//     return localStorage.getItem(TOKEN);
//   }

//   static getUserId(): string{
//     const user = this.getUser();
//     if(user == null) return '';
//     console.log(user)
//     return user.userId;
//   }

//   static getUserRole(): string{
//     const user = this.getUser();
//     if(user == null) return '';
//     console.log(user)
//     return user.role;
//   }

//   static isAdminLoggedIn(): boolean{
//     if(this.getToken === null){
//       return false;
//     }
//     const role: string = this.getUserRole();
    
//     return role == 'ADMIN';
//   }

//   static isCustomerLoggedIn(): boolean{
//     if(this.getToken === null){
//       return false;
//     }
//     const role: string = this.getUserRole();
    
//     return role == 'CUSTOMER';
//   }

//   static signOut(): void{
//     window.localStorage.removeItem(TOKEN);
//     window.localStorage.removeItem(USER);
//   }
// }

import { Injectable } from '@angular/core';

const TOKEN = "ecom-token";
const USER = "ecom-user";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  public saveToken(token: string): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  public saveUser(user: any): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUser(): any | null {
    if (typeof window !== 'undefined') {
      const user = window.localStorage.getItem(USER);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user == null) return '';
    return user.userId;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) return '';
    // console.log(user.role)
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'CUSTOMER';
  }

  static signOut(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}
