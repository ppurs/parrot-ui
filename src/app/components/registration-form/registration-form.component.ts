import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { passwordMatchValidator, uniqueUsernameValidator } from './registration-validators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm = this.fb.group({
    username: ['',  {
                    validators: [
                      Validators.required,
                      Validators.pattern("[a-zA-Z0-9_]*"),
                      uniqueUsernameValidator
                    ],
                    updateOn: 'blur'
                }
              ],
    email: ['', [
                  Validators.required, 
                  Validators.email
                ]
              ],      
    password:['', [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(32)
                  ]
                ],                       
    passwordRepetition: ['', Validators.required],  
    acceptTerms: [false, {
                          validators: [Validators.requiredTrue],
                          updateOn: 'submit'
                        } 
                  ]
  }, {
    validators: [
      passwordMatchValidator('password', 'passwordRepetition')
    ]
  });

  constructor(private fb: FormBuilder,
              //private http: HttpClient,
              private registration: RegistrationService,
              private router: Router ) {}

  ngOnInit(): void {}

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get passwordRepetition() {
    return this.registrationForm.get('passwordRepetition');
  }

  get acceptTerms() {
    return this.registrationForm.get('acceptTerms');
  }

  onSubmit() {
    if ( this.registrationForm.invalid ) {
      console.log("invalid");
      this.registrationForm.markAllAsTouched();
    }
    else {
      this.sendRegisterData();
      this.router.navigateByUrl('/login');
    }
  }

  /*validateUsername(): void {
    this.registration.validateUserUnique("baranekShawn")
  }*/

  sendRegisterData(): void {
    const data = {
      username: this.username?.value,
      password: this.password?.value,
      email: this.email?.value
    } 

    // const data = {
    //   username: "baranekShawn",
    //   password: "password123",
    //   email: "email@email.com"
    // } 

    this.registration.register( data );
  }
}
