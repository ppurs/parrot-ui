import { Component, OnInit } from '@angular/core';
import { UsersFilter } from 'src/app/models/users-filter';
import { FacadeService } from 'src/app/services/facade/facade.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  isLoadingPage: boolean;

  private filter?: UsersFilter;

  constructor( private facade: FacadeService) {
    this.isLoadingPage = true;
   }

  ngOnInit(): void {
    this.loadFilters();
  }

  applyFilter(event: UsersFilter): void {
    this.filter = event;
    //
  }

  private loadFilters(): void {
    this.facade.loadUsersToFilters().subscribe( res => {
      this.isLoadingPage = false;
    });
  }
}
