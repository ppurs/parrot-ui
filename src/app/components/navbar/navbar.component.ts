import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarNavigation } from 'src/app/models/navbar-navigation';
import { TransaltionLanguages } from 'src/app/models/translation-languages';
import { User } from 'src/app/models/user';
import { FacadeService } from 'src/app/services/facade/facade.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  activeLinks: NavbarNavigation[];
  accountDetails: User | null;
  languages?: TransaltionLanguages;
  currentLangFrom: string = 'English';
  currentLangTo: string = 'English';

  private readonly navigations: NavbarNavigation[] = [
    //{ header: 'Quiz', route: '/quiz' },
    { header: 'Translations', route: '/translations' },
    //{ header: 'Labels', route: '/labels' },
  ]

  constructor(private facade: FacadeService,
              private router: Router ) { 
    this.activeLinks = [];
    this.accountDetails = null;
  }

  ngOnInit(): void {
    this.setNavbarNavigation();
    this.languages = this.facade.getUserLanguages();
    this.accountDetails = this.facade.getUserData();
  }

  logout(): void {
    
  }

  onLanguageChoose(lang: string, type: string): void {
    if ( type == 'from' ) {
      this.currentLangFrom = lang;
    }
    else if ( type == 'to' ) {
      this.currentLangTo = lang;
    }

    //request to backend
    //refresh website
  }

  onLogoClick(): void {
    this.router.navigate(['']);
  }

  onNavigationClick(link: NavbarNavigation): void {
    this.router.navigate([link.route]);
  }

  private setNavbarNavigation(): void {
    const responseNavigations = this.facade.getNavbarNavigation();

    this.activeLinks = this.navigations
      .filter( value => responseNavigations
        .some( element => element.toLocaleLowerCase() == value.header.toLowerCase() ));
  }
   
}
