import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
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
  isImpersonatePending: boolean;

  private stateSubscription?: Subscription;

  constructor(public dialog: MatDialog, 
              private auth: AuthService,
              private facade: FacadeService,
              private router: Router ) {
    this.isImpersonatePending = false;
              }

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
    if( this.user.userId ) {
      this.isImpersonatePending = true;

      this.auth.impersonateUser(this.user.userId ).subscribe( res => {
        if ( res ) {
          window.location.replace( window.location.origin + this.auth.INITIAL_PATH );
          //this.isImpersonatePending = false;
        }
      });
    }
  }

  private disableUser(): void {
    this.user.accountState = AccountState.Disabled;

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
