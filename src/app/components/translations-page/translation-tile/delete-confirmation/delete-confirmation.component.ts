import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  @Input() msgParam!: {value: string};
  @Output() confirmation =  new EventEmitter<boolean>();
  btnDisabled: boolean;

  constructor() {
    this.btnDisabled = false;
   }

  ngOnInit(): void {
  }

  confirm(event: Event): void {
    this.confirmation.emit(true);
    this.afterBtnClick(event);
  }

  cancel(event: Event): void {
    this.confirmation.emit(false);
    this.afterBtnClick(event);
  }

  private afterBtnClick(event: Event): void {
    event.stopPropagation();
    this.btnDisabled = true;
  }
}
