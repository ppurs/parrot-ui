import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterForm } from 'src/app/models/filter-form';
import { UsersFilter } from 'src/app/models/users-filter';
import { UsersFilterElement } from 'src/app/models/users-filter-element';
import { FacadeService } from 'src/app/services/facade/facade.service';

@Component({
  selector: 'app-users-filter-form',
  templateUrl: './users-filter-form.component.html',
  styleUrls: ['./users-filter-form.component.scss']
})
export class UsersFilterFormComponent implements FilterForm, OnInit {
  @Output()
  filterApplied = new EventEmitter<UsersFilter>();   
  
  filterForm = this.fb.group({
    users: [<number[]><unknown>undefined],
    accountState: [<number|null>null]
  });
  
  Users: UsersFilterElement[];

  constructor(private fb: FormBuilder,
              private facade: FacadeService) { 
    this.Users = [];
  }

  get users() {
    return this.filterForm.get('users');
  }

  get accountState() {
    return this.filterForm.get('accountState');
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  onSubmit(): void {
    const payload: UsersFilter = {
      userIds: this.users?.value ?? [],
      accountState: this.accountState?.value ?? undefined
    }

    this.filterApplied.emit(payload);
  }

  private getUsersList() {
    this.Users = this.facade.getUsersToFilters();
  }

}