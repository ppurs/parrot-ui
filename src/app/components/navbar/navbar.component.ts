import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/auth/models/role';
import { FacadeService } from 'src/app/services/facade/facade.service';
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
  @Input() activeLinks: NavbarNavigation[];

  @Output() isLoaded = new EventEmitter();
  @Output() toggleLeftSidenav = new EventEmitter();
  @Output() toggleRightSidenav = new EventEmitter();

  readonly USER_ROLE: Role = Role.USER;

  accountType?: string;
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
    this.setAccountType();
    this.setNavigation();
  }

  goBackToAdmin(): void {
    this.auth.undoImpersonateUser();
  }

  isUserImpersonated(): boolean {
    return this.auth.isUserImpersonated();
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
          }
        })
      }
    }
  }

  onLogoClick(): void {
    this.router.navigate(['']);
  }

  onMenuButtonClick(): void {
    this.toggleLeftSidenav.emit();
  }

  onNavigationClick(link: NavbarNavigation): void {
    this.router.navigate([link.route]);
  }

  onUserButtonClick(): void {
    this.toggleRightSidenav.emit();
  }

  onWheel(event: WheelEvent): void {
    document.getElementById('navigations')!.scrollLeft += event.deltaY;
    event.preventDefault();
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
    this.facade.getAccountTypes().subscribe( res => {
      this.accountType = '';
      res.forEach( type => this.accountType += type.type );
    })
  }

  private setNavigation(): void {
    this.facade.getNavigations().subscribe( res => {
      this.activeLinks = res;
    });
  }
}
