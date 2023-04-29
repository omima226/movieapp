import {  Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){ }

  isLoading:boolean = false;
  errMsg:string = ''
  err:boolean = false

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required  ,Validators.email]),
    password: new FormControl(null , [Validators.required  , Validators.pattern(/^[a-z0-9]{3,}$/) ])
  })

  login(loginForm:FormGroup){
    console.log(loginForm.value);
    this.isLoading = true
    if (loginForm.valid)
    {
      this._AuthService.login(loginForm.value).subscribe({
        next: res=>{
          console.log(res);
          if(res.message == 'success'){
            localStorage.setItem('uToken' , res.token)
            this._AuthService.userData.next(res.token)
            this._Router.navigate(['/home'])
            this.isLoading =false
          }
        },
        error: err=>{
          console.log(err);
            this.err = true
            this.errMsg = err.error.message
            this.isLoading = false

        }
      })
    }
  }


  visible: boolean | undefined;

  showDialog() {
      this.visible = true;
  }


  //!--Forget Password

  errForget!:string
  doneForget!:string
  forgetLoading:boolean = false
  forgetErr:boolean = false
  emailForm:boolean = true

  codeForm:boolean = false

  codeLoading:boolean = false
  codeErr:boolean = false
  errCode!:string
  doneCode!:string

  NewPass:boolean = false
  doneNew!:string
  newLoading:boolean = false
  newErr:boolean = false

  forgetPass:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email])
  })

  forgetPassword(){
    this.forgetLoading = true

    if (this.forgetPass.valid) {
      this._AuthService.forgetPassword(this.forgetPass.value).subscribe({
        next:res=>{
          console.log(res);
          if (res.statusMsg == 'success') {
            this.doneForget = res.message
            this.forgetLoading = false
            this.forgetErr = false
            setTimeout(() => {
              this.emailForm = false
              this.codeForm = true
            }, 1000);
          }
        },
        error:err=>{
          console.log(err);
          this.errForget = err.error.message
          this.forgetLoading= false
          this.forgetErr =true

        }
      })
    }

  }


  verifyForm:FormGroup = new FormGroup({
    resetCode:new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{4,}$/)])
  })

  verifyCode(){
    console.log(this.verifyForm.value);
    this.codeLoading = true
    if (this.verifyForm.valid) {
      this._AuthService.verifyCode(this.verifyForm.value).subscribe({
        next:res=>{
          console.log(res);
          this.codeLoading = false
          if (res.status == 'Success') {
            this.doneCode = res.status
            this.codeErr = false
            setTimeout(() => {
              this.NewPass = true
              this.codeForm = false
            }, 1000);
          }
        },
        error : err=>{
          console.log(err);
          this.codeLoading = false

          this.errCode = err.error.message

          this.codeErr = true
        }
      })
    }
  }


  resetForm:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
    newPassword: new FormControl(null , [Validators.required  , Validators.pattern(/^[a-z0-9]{1,}$/) ])
  })

  newPassord(){
    this.newLoading = true

    console.log(this.resetForm.value);
    if (this.resetForm.valid) {
      this._AuthService.resetPassword(this.resetForm.value).subscribe({
        next: res=>{
          console.log(res);
          this.newLoading = false
          this.newErr = true
          localStorage.setItem('uToken' , res.token)
          this.doneNew = 'Your Password is Changed Successfully'
          setTimeout(() => {
            this.newErr = false
            this._AuthService.decode()
            this._Router.navigate(['/home'])
          }, 2000);
        },
        error: err=>{
          console.log(err);
        this.newLoading = false
        }
      })
    }
  }
}
