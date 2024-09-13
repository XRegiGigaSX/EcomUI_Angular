import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserStorageService } from '../storage/user-storage.service';
import { map } from 'rxjs/operators';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService,
  ) { }

  register(signupRequest: any): Observable<any>{
    let res = this.http.post(BASIC_URL+"sign-up", signupRequest);
    console.log(res)
    return res;
  }

  login(username: string, password: string): any{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {username, password, 'Content-Type': 'application/json'};
    
    return this.http.post(BASIC_URL + 'authenticate', body, {headers, observe: 'response'}).pipe(
      map((res) => {
        const token = res.headers.get('authorization').substring(7);
        const user = res.body;
        if(token && user){
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          const userBody: any = UserStorageService.getUser();
          console.log(userBody)
          return true;
        }

        return false;
      })
    )
  }
}
