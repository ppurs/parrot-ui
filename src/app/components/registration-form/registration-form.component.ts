import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      //pass data to backend
      this.router.navigateByUrl('/login');
    }
  }
}
