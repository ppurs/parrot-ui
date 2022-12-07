import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'parrot-ui';

  constructor( private router: Router) {}

  public loginBtnClick() {
    this.router.navigateByUrl('/login');
  }

  public registrationBtnClick() {
    this.router.navigateByUrl('/register');
  }
}
