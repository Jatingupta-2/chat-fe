import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import{AppService} from '../app.service';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'signup',component:SignupComponent}
    ])
  ]
})
export class UserModule { }
