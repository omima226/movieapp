import {  Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){ }

  isLoading:boolean = false
  errMsg:string = ''
  err:boolean = false
  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required , Validators.maxLength(20) , Validators.minLength(4) , Validators.pattern(/^[A-Z][a-z]{3,}$/)]),
    email: new FormControl(null , [Validators.required  ,Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) ]),
    rePassword: new FormControl(null , [Validators.required  ]),
    phone: new FormControl(null , [Validators.required  , Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , { validators: this.rePassword } )

  rePassword(registerForm:any){
    let passwordControl = registerForm.get('password')
    let rePasswordControl = registerForm.get('rePassword')
    if (passwordControl?.value == rePasswordControl?.value) {
      return null
    }else{
      rePasswordControl?.setErrors({passwordMatch : 'rePassword must Matched'})
      return {passwordMatch : 'rePassword must Matched0'}
    }
  }

  register(registerForm:FormGroup){
    console.log(registerForm.value);
    this.isLoading = true
    if (registerForm.valid) {

      this._AuthService.register(registerForm.value).subscribe({
        next: res=>{
          console.log(res);
          if(res.message == 'success'){
            localStorage.setItem('uToken' , res.token)
            this._Router.navigate(['/login'])
            console.log('Done');
            this.isLoading = false
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


}


/**
 * "name": "Ahmed Abd Al-Muti",
    "email":"ahmedmutti@gmail.com",
    "password":"Ahmed@123",
    "rePassword":"Ahmed@123",
    "phone":"01010700700"
 */
