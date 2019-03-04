  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { AppService } from '../../app.service';
  import { ToastrService } from 'ngx-toastr';

  @Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  })
  export class SignupComponent implements OnInit {

    constructor(private router: Router, private apps: AppService, private toastr: ToastrService) { }

    ngOnInit() {
    }

    public signin = () => {
      this.router.navigate(['/']);
    }

    public firstName: any;
    public lastName: any;
    public mobile: any;
    public email: any;
    public password: any;
    public apiKey: any;

    public signup: any = () => {
      if (!this.firstName) {
        this.toastr.warning('Please Enter First Name');
      }
      else if (!this.lastName) {
        this.toastr.warning('Please Enter Last Name');
      }
      else if (!this.mobile) {
        this.toastr.warning('Please Enter Mobile');
      }
      else if (!this.email) {
        this.toastr.warning('Please Enter email');
      }
      else if (!this.password) {
        this.toastr.warning('Please Enter password');
      }
      else if (!this.apiKey) {
        this.toastr.warning('Please Enter apiKey');
      }
      else {
        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          mobile: this.mobile,
          email: this.email,
          password: this.password,
          apiKey: this.apiKey

        }
        this.apps.signup(data).subscribe(
          (apiResponse)=>{

            console.log(apiResponse);
            if(apiResponse.status==200){
              this.toastr.success("SignUp Successful"+" "+apiResponse.data.userId)
              setTimeout(()=>{
                this.router.navigate(['/'])
              },2000) ;
            }
            else{

            }
          },(error)=>{

          }
        )
      }

    }
  }
