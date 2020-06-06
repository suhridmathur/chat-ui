import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector : 'chat-page',
    templateUrl : './chatpage.component.html',
    styleUrls : ['./chatpage.component.css']
})
export class ChatPageComponent implements OnInit {
    chatSocket : any;
    message : string;
    receivedMessage : any;
    messages : Object[];
    httpOptions : any;
    myUsername : string;
    
    constructor(private http: HttpClient) {
    }
    

    ngOnInit(){
        this.getMessages();
        //Wrong way of sending token, but can't think of anything else right now.
        this.chatSocket = new WebSocket("ws://localhost:8000"+window.location.pathname+"/?token="+localStorage.getItem('token'));
        this.chatSocket.onmessage = (e) => {
            var data = JSON.parse(e.data)
            this.messages.push(data)
            var container = document.getElementById("msgContainer");    
            container.scrollTop = container.scrollHeight;
        }
    }

    getMessages(){
        this.httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        if(localStorage.getItem('token')){
            this.httpOptions = {
                headers: new HttpHeaders({'Authorization': 'Token '+localStorage.getItem('token')})
            };  
        }
        this.http.get('http://localhost:8000/api/v1'+ window.location.pathname +'/', this.httpOptions).subscribe(
            data => {
                this.messages = data['payload']['messages'];
                this.myUsername = data['payload']['my_username'];
            },
            err => {
                console.log(err)
            }
        )
    }
    sendMessage(){
        var data = {}
        data['token'] = localStorage.getItem('token')
        data['message'] = this.message
        this.chatSocket.send(JSON.stringify(data));     
        this.message = '';  
    }
}