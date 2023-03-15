import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { Role } from '../../models/role';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest([this.authService.isLoggedIn$(), this.authService.getUserRoles$()]).pipe(
      map( ([isLoggedIn, userRoles]) => { 
          if ( !isLoggedIn ) {
            this.router.navigate([this.authService.LOGIN_PATH]);
            return false;
          }

          if( route.data['roles'] && !route.data['roles'].some( (role: Role) => userRoles.includes(role) )) {
            this.router.navigate([this.authService.INITIAL_PATH]);
            return false;
          }

          return true;
        }
      )
    );
  }
  
}
