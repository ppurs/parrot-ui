import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { UsersFilter } from 'src/app/models/users-filter';
import { FacadeService } from 'src/app/services/facade/facade.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  isLoadingList: boolean;
  isLoadingPage: boolean;
  usersList: User[];
  
  private filter?: UsersFilter;

  constructor(private cdref: ChangeDetectorRef, 
              private facade: FacadeService) {
    this.isLoadingList = true;
    this.isLoadingPage = true;
    this.usersList = [];
   }

  ngOnInit(): void {
    this.loadFilters();
    this.getUsersList();
  }

  applyFilter(event: UsersFilter): void {
    this.filter = event;
    this.usersList = [];
    this.getUsersList();
    this.cdref.detectChanges();
  }

  private getUsersList(): void {
    this.isLoadingList = true;

    this.facade.getUsersList( this.filter ).subscribe(
      res => {
        this.usersList = res;
        this.isLoadingList = false;
      }
    );
  }

  private loadFilters(): void {
    this.facade.loadUsersToFilters().subscribe( res => {
      this.isLoadingPage = false;
    });
  }
}
