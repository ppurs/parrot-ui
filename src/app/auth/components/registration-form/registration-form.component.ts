import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { POSTRegister } from 'src/app/auth/models/post-register';
import { AuthService } from '../../services/auth/auth.service';
import { passwordMatchValidator } from './validators/password-match-validator';
import { UniqueUsernameValidator } from './validators/unique-user-validator';

//TODO: add default langs choose

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
                    ],
                    asyncValidators: [UniqueUsernameValidator.createValidator(this.auth)],
                    updateOn: 'blur'
                }
              ],
    email: ['', [                           //email exists validation??
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

  constructor(private auth: AuthService,
              private fb: FormBuilder,
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
      this.registrationForm.markAllAsTouched();
    }
    else {
      this.sendRegisterData();
    }
  }

  private onSuccess() {
    this.router.navigate(['/login']);
  }

  private sendRegisterData(): void {
    const data: POSTRegister = {
      username: <string>this.username?.value ,
      password: <string>this.password?.value,
      email: <string>this.email?.value
    }

    this.auth.register( data ).subscribe( res => {
      if ( res.result ) {
        this.onSuccess();
      }
      else {
        //error (from backend) statement
        console.log(res.errors);
      }
    });
  }
}
