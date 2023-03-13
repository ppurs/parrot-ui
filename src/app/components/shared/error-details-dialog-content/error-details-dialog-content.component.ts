import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-details-dialog-content',
  templateUrl: './error-details-dialog-content.component.html',
  styleUrls: ['./error-details-dialog-content.component.scss']
})
export class ErrorDetailsDialogContentComponent implements OnInit {
  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: HttpErrorResponse) { 
    this.title = data.status + ' ' + data.statusText;
    this.message = data.message;
  }

  ngOnInit(): void {}
}
