import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CurrentLanguages } from 'src/app/models/current-languages';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { NavbarNavigation } from 'src/app/models/navbar-navigation';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Language } from 'src/app/models/language';

//TODO: delay for load navbar data

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() isLoaded = new EventEmitter();

  accountType: string = 'Free account';
  activeLinks: NavbarNavigation[];
  currentLangs?: CurrentLanguages;
  isLoading: boolean;
  languages?: Language[];
  username?: string;

  private readonly navigations: NavbarNavigation[] = [
    //{ header: 'Quiz', route: '/quiz' },
    { header: 'Translations', route: '/translations' },
    //{ header: 'Labels', route: '/labels' },
  ]

  constructor(private facade: FacadeService,
              private router: Router,
              private auth: AuthService ) { 
    this.activeLinks = [];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.loadNavbarData();
    this.setNavbarNavigation();
  }

  logout(): void {
    this.auth.logout();
  }

  onLanguageChoose(lang: Language, type: string): void {
    if ( this.currentLangs ) {
      if ( type == 'from' ) {
        this.currentLangs.languageFrom = lang;
      }
      else if ( type == 'to' ) {
        this.currentLangs.languageTo = lang;
      }

      this.facade.changeCurrentLanguages(this.currentLangs);
    }

    //refresh website
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

  private setNavbarNavigation(): void {
    const responseNavigations = this.facade.getNavbarNavigation();

    this.activeLinks = this.navigations
      .filter( value => responseNavigations
        .some( element => element.toLocaleLowerCase() == value.header.toLowerCase() ));
  }
   
}
