import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ErrorDetailsDialogContentComponent } from '../error-details-dialog-content/error-details-dialog-content.component';


@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss']
})
export class ErrorToastComponent implements OnInit {
  private snackBarRef = inject(MatSnackBarRef);
 
  constructor(  private dialog: MatDialog,
                @Inject(MAT_SNACK_BAR_DATA) private data: HttpErrorResponse ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.snackBarRef.dismissWithAction();
  }

  onShowDetails(): void {
    this.dialog.open(ErrorDetailsDialogContentComponent, { 
      autoFocus: false, 
      restoreFocus: false,
      data: this.data 
    });
  }
}
