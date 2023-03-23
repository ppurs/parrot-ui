import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { AccountState } from 'src/app/models/account-state';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {
  @Input() user!: User;

  accountState: FormControl = new FormControl(<boolean|undefined>undefined);

  private stateSubscription?: Subscription;

  constructor(public dialog: MatDialog, 
              private facade: FacadeService ) {}

  ngOnInit(): void {
    this.accountState.setValue( this.isActive() );
    if ( !this.isActive() ) {
      this.accountState.disable();
    }
    else {
      this.subscribeAccountStateValue();
    }
  }

  getAccountStateKey(): string {
    return 'users-list.account-state.' + AccountState[ this.user.accountState ?? 0 ].toLocaleLowerCase();
  }

  isActive(): boolean {
    return this.user.accountState == AccountState.Active;
  }

  impersonateUser(): void {
    //todo
  }

  private disableUser(): void {
    this.user.accountState = AccountState.Disabled;
    console.log('disabling user..');

    this.openConfirmation().afterClosed().subscribe(result => {
      if ( !result ) {
        this.undoDisableUser();
      } else {
        if( this.user.userId ) {
          this.facade.disableUser( this.user.userId ).subscribe( res => {
            if ( !res.result ) {
              this.undoDisableUser();
            }
          });
        }    
      }
    });
  }

  private openConfirmation(): MatDialogRef<any, any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: this.user.username
    });
  }

  private subscribeAccountStateValue(): void {
    this.stateSubscription = this.accountState.valueChanges.subscribe( val => {
      if ( !val ) {
        this.disableUser();
        this.accountState.disable({emitEvent: false});
      }
    });
  }

  private undoDisableUser(): void {
    this.user.accountState = AccountState.Active;
    this.accountState.enable({ emitEvent: false });      
    this.accountState.setValue(true);  
  }

  ngOnDestroy(): void {
    if ( this.stateSubscription ) {
      this.stateSubscription?.unsubscribe();
    }
  }
}
