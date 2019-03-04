import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import{RouterModule,Routes} from '@angular/router';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import{ToastrModule} from 'ngx-toastr';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{AppService} from '../app/app.service';
import{HttpClient,HttpErrorResponse,HttpClientModule} from '@angular/common/http';

import{ChatModule} from './chat/chat.module';
import{UserModule} from './user/user.module'
import {SharedModule} from './shared/shared.module';


import{LoginComponent} from './user/login/login.component';
import{SignupComponent} from './user/signup/signup.component';
import{ChatboxComponent} from '../app/chat/chatbox/chatbox.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    UserModule,HttpClientModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'',pathMatch:'full',redirectTo:'login'}
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
