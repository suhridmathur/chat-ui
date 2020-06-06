import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginService } from './user/login.service'; 
import { FormsModule } from '@angular/forms'; 
import { ChatComponent } from './user/chat.component';
import { ChatPageComponent } from './user/chatpage.component';
import { BaseComponent } from './user/base.component';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    BaseComponent,
    LoginComponent,
    AppComponent,
    ChatComponent,
    ChatPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [LoginService],
  bootstrap: [BaseComponent]
})
export class AppModule { }
