import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade/facade.service';

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

  constructor(private facade: FacadeService,
              private fb: FormBuilder,
              private router: Router ) {
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
      
      if( this.isSuccess ) {
        this.facade.setUserData( null );
        this.router.navigate(['']);
      }
    }
  }

  getResponseFromLogin(): boolean {
    return true;
  }

}
