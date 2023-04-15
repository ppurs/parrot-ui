import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { Language } from 'src/app/models/language';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('leftSidenav') leftSidenav!: MatSidenav;
  @ViewChild('rightSidenav') rightSidenav!: MatSidenav;

  @ViewChild('navbar') navbar!: NavbarComponent;

  isLoaded: boolean;
  langFromExpanded: boolean;
  langToExpanded: boolean;
  showLangList: boolean;

  private sidenavSubscription?: Subscription;

  constructor() {
    this.isLoaded = false;
    this.langFromExpanded = false;
    this.langToExpanded = false;
    this.showLangList = false;
   }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sidenavSubscription = this.leftSidenav._closedStream.subscribe( () => this.closeSidenavLists() );
  }

  renderLayout() {
    this.isLoaded = true;
  }

  toggleLeftSidenav(): void {
    if( this.leftSidenav.opened ) {
      this.leftSidenav.close();
    }
    else {
      this.rightSidenav.close();
      this.leftSidenav.open();
    }
  }

  toggleRightSidenav(): void {
    if( this.rightSidenav.opened ) {
      this.rightSidenav.close();
    }
    else {
      this.leftSidenav.close();
      this.rightSidenav.open();
    }
  }

  onLanguageChoose(lang: Language, type: string): void {
    this.navbar.onLanguageChoose( lang, type );
    
    switch ( type ) {
      case 'to': {
        this.langToExpanded = false;
        break;
      }
      case 'from': {
        this.langFromExpanded = false;
        break;
      }
    }
  }

  private closeSidenavLists() {
    this.langFromExpanded = false;
    this.langToExpanded = false;
    this.showLangList = false;
  }

  ngOnDestroy(): void {
    this.sidenavSubscription?.unsubscribe();
  }
}
