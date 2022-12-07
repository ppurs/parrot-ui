import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password:['', Validators.required]
  });

  isSuccess: boolean;

  constructor(private fb: FormBuilder) {
    this.isSuccess = true;
  }

  ngOnInit(): void {}

  onSubmit() {
    if ( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
    }
    else {
      //pass data to backend and get response
      this.isSuccess = this.getResponseFromLogin();
    }
  }

  getResponseFromLogin(): boolean {
    return true;
  }

}
