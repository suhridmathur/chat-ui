import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user : any;

  constructor(private _loginService: LoginService, private router: Router) {}

  ngOnInit() {

    if(localStorage.getItem('token')){
      this.router.navigate(['/chat'])
    }

    this.user = {
      username:'',
      password:''
    };
  }

  login(){
    this._loginService.login({'username':this.user.username, 'password':this.user.password})
  }
}
