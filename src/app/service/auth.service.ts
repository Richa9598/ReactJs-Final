import { Injectable } from '@angular/core';
import { BehaviorSubject, identity, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const url = 'http://localhost:3000/';

export interface IAuth {
  message:string;
  token: string;
  result: string;
  username: string;
  email:string;
  password:string;
  address:string;
 
}
export interface IProfile {
  id: number;
  login_username: string; 
  email: string;
  address: string;
}
export interface ITestimonials {
  id:number,
  name: string,
  designation: string,
  comment :string,
}
export interface IBookmarks {
  user_id:number,
  dest_id:number;
  DES_NAME : string,
  des_rating:string,
  bookmark_id:number
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();


  constructor(private http: HttpClient) {
    const mytoken = localStorage.getItem('authtoken');
    // console.log(mytoken);
    // return !this.jwtHelper.isTokenExpired(token);

    this._isLoggedIn$.next(!!mytoken);
  }
  
  login(username: string, password: string): Observable<IAuth> {
    return this.http
      .post<IAuth>(url + 'login', {
        uname: username,
        password: password,
      })
      .pipe(
        tap((response) => {
          this._isLoggedIn$.next(true);
          localStorage.setItem('authloginToken', response.token);
          localStorage.setItem('userData', JSON.stringify(response.result));
        })
      );
  }

  register(username: string, email: string, password:string,address:string):Observable<IAuth>{
    return this.http
      .post<IAuth>(url + 'register', {
        username: username,
        email: email,
        password :password,
        address:address,
      })
  }

  addTestimonial(name: string, designation: string, comment:string) {
    return this.http
      .post(url + 'testimonial', {
        name: name,
        designation: designation,
        comment :comment,
      })
  }
  fetchTestimonial(){
    return this.http.get<ITestimonials>(
      url + 'testimonials',
      this.httpOptions
    )
  }
  fetchBookmarks(id:number){
    return this.http.get<IBookmarks>(
      url + 'bookmark/'+id,
      this.httpOptions
    )
  }

  deleteTestimonials(id:number){
    return this.http.delete(
      url +'testimonial/'+id,
      this.httpOptions
    )
  }

  deleteBookmark(id:number){
    return this.http.delete(
      url +'bookmark/'+id,
      this.httpOptions
    )
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('authtoken')!,
    })
  }
}
