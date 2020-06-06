import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']  
})
export class ChatComponent implements OnInit{
    public usersList;
    private httpOptions: any;
    ngOnInit() {
        if(localStorage.getItem('token')){
            this.getUsers();
        }
        else{
          this.router.navigate(['login/'])
        }
    }

    constructor(private http: HttpClient, private router: Router) {
        this.httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        if(localStorage.getItem('token')){
          this.httpOptions = {
            headers: new HttpHeaders({'Authorization': 'Token '+localStorage.getItem('token')})
          };  
        }
      }

    getUsers() {
        this.http.get('http://localhost:8000/api/v1/users/', this.httpOptions).subscribe(
          data => {
            this.usersList = data['payload'];
          }
        )
      }
      
      startChat(event){
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var userId = idAttr.nodeValue
        this.router.navigate(['message/'+userId+'/'])
      }
}
