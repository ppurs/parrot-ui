import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss', '../auth-form.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password:['', Validators.required]
  });

  isRequestPending: boolean;
  isSuccess: boolean;
  errorMsg?: string;
  private valSubscription: any;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private translate: TranslateService ) {
    this.isRequestPending = false;
    this.isSuccess = true;
  }

  ngOnInit(): void {
    this.valSubscription = this.loginForm.valueChanges.subscribe(() => this.isSuccess = true);
  }

  onSubmit() {
    if ( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
    }
    else {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.isRequestPending = true;
      this.isSuccess = true;

      this.auth.login( <string>username, <string>password ).subscribe({
        next: (res) => {
          this.isRequestPending = false;

          if( res.result ) {
            this.router.navigate([this.auth.INITIAL_PATH])
          }
          else {
            //error (different than password/username) statement
            this.isSuccess = false;

            if( res.errors?.at(0)?.message && res.errors?.at(0)?.message != '') {
              this.errorMsg = res.errors?.at(0)?.message
            }
            else {
              this.translate.get('login-form.errors.negative-response').subscribe( res => this.errorMsg = res );
            }
          }
        },
        error: (e) => {
          this.isRequestPending = false;
        }
      }
      )
    }
  }

  ngOnDestroy(): void {
    this.valSubscription.unsubscribe();
  }

}
