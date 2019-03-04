import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apps: AppService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  public email: any;
  public password: any;

  public signup: any = () => {
    this.router.navigate(['signup']);
  }

  public signin: any = () => {
    if (!this.email) {
      this.toastr.warning("Please Enter Email");
    }
    if (!this.password) {
      this.toastr.warning("Please Enter Password");
    }
    else {
      let data = {
        email: this.email,
        password: this.password
      }

      this.apps.signin(data).subscribe(
        
        (apiResponse) => {
          if (apiResponse.status == 200) {
            console.log(apiResponse);
            Cookie.set('authToken', apiResponse.data.authToken);
            Cookie.set('receiverId', apiResponse.data.userDetails.userId);
            console.log(apiResponse.data.userDetails);
            Cookie.set('receiverName', `${apiResponse.data.userDetails.firstName} ${apiResponse.data.userDetails.lastName}`);
            this.toastr.success(`${apiResponse.data.userDetails.firstName} ${apiResponse.data.userDetails.lastName} ${apiResponse.data.userDetails.userId}`)
            this.apps.setUserInfo(apiResponse.data.userDetails);
            this.toastr.success("Successfully Logged In");
            this.router.navigate(['/chat']);
          }
          else {
            this.toastr.error(apiResponse.message);
          }
        },
        error => {
          this.toastr.error("Error"+error);
        }
      )}
  }


  loginUsingKeyPress:any=(event:any)=>{
    if(event.keyCode===13){
      this.signin();
    }
  }
}
