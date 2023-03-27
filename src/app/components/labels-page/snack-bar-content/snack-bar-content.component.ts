import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-content',
  templateUrl: './snack-bar-content.component.html',
  styleUrls: ['./snack-bar-content.component.scss']
})
export class SnackBarContentComponent implements OnInit {
  @Output() refreshList = new EventEmitter();
  snackBarRef = inject(MatSnackBarRef);

  ngOnInit(): void {
  }

  onClose(): void {
    this.snackBarRef.dismissWithAction();
  }

  onRefresh(): void {
    this.refreshList.emit()
  }

}
