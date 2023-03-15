import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/auth/models/role';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { AccountType } from 'src/app/models/account-type';
import { CurrentLanguages } from 'src/app/models/current-languages';
import { Language } from 'src/app/models/language';
import { NavbarNavigation } from 'src/app/models/navbar-navigation';
import { AuthService } from 'src/app/auth/services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() isLoaded = new EventEmitter();

  readonly USER_ROLE: Role = Role.USER;

  private readonly ACCOUNT_TYPES: AccountType[] = [
    { role: Role.USER, type: 'Free account' },
    { role: Role.ADMIN, type: 'Admin' }
  ];
  private readonly NAVIGATIONS: NavbarNavigation[] = [
    { header: 'Quiz', route: '/quiz', forRoles: [Role.USER] },
    { header: 'Translations', route: '/translations', forRoles: [Role.USER] },
    { header: 'Labels', route: '/labels', forRoles: [Role.USER] },
    { header: 'Users', route: '/users', forRoles: [Role.ADMIN] }
  ];

  accountType?: string;
  activeLinks: NavbarNavigation[];
  currentLangs?: CurrentLanguages;
  isLoading: boolean;
  languages?: Language[];
  username?: string;

  constructor(private facade: FacadeService,
    private router: Router,
    private auth: AuthService) {
    this.activeLinks = [];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.loadNavbarData();
    this.setNavbarNavigation();
    this.setAccountType();
  }

  logout(): void {
    this.auth.logout();
  }

  onLanguageChoose(lang: Language, type: string): void {
    if (this.currentLangs) {
      const oldLangs = { ...this.currentLangs };
      var changed = false;

      switch (type) {
        case 'from': {
          if (this.currentLangs.languageFrom.id != lang.id) {
            this.currentLangs.languageFrom = lang;
            changed = true;
          }
          break;
        }
        case 'to': {
          if (this.currentLangs.languageTo.id != lang.id) {
            this.currentLangs.languageTo = lang;
            changed = true;
          }
          break;
        }
      }

      if (changed) {
        this.facade.changeCurrentLanguages(this.currentLangs).subscribe(res => {
          if (res.result) {
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate([currentRoute]));
          }
          else {
            this.currentLangs = oldLangs;
            //show error message
          }
        })
      }
    }
  }

  onLogoClick(): void {
    this.router.navigate(['']);
  }

  onNavigationClick(link: NavbarNavigation): void {
    this.router.navigate([link.route]);
  }

  private loadNavbarData(): void {
    this.facade.getNavbarData().subscribe(
      res => {
        this.username = res.username;
        this.currentLangs = res.currentLanguages;
        this.languages = res.languages;

        this.isLoading = false;
        this.isLoaded.emit();
      }
    );
  }

  private setAccountType(): void {
    this.auth.getUserRoles$().subscribe(roles => {
      if (roles) {
        this.accountType = '';
        roles.forEach(role => this.accountType += this.ACCOUNT_TYPES.find(val => val.role === role)?.type ?? '')
      }
    }
    )
  }

  private setNavbarNavigation(): void {
    this.auth.getUserRoles$().subscribe(roles => {
      if (roles) {
        this.activeLinks = this.NAVIGATIONS
          .filter(nav => roles.some(val => nav.forRoles.includes(val)));
      }
    }
    );
  }

}
