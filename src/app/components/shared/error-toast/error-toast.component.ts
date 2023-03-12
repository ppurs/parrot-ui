import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';


@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss']
})
export class ErrorToastComponent implements OnInit {
  snackBarRef = inject(MatSnackBarRef);
 
  constructor() {}

  ngOnInit(): void {}

  onClose(): void {
    this.snackBarRef.dismissWithAction();
  }
}
