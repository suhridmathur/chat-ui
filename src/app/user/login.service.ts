import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
 
  // http options used for making API calls
  private httpOptions: any;
 
  // the username of the logged in user
  public username: string;
 
  // error messages received from the login attempt
  public errors: any = [];
  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
 
  public login(user) {
    this.http.post('http://localhost:8000/api/v1/login/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        localStorage.setItem('token', data['token']);
        this.router.navigate(['/chat'])
      },
      err => {
        this.errors = err['error'];
      }
    );
  }
 
  public logout() {
    localStorage.removeItem('token')
  }
 
}