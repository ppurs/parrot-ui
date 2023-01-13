import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TileStateStatus } from 'src/app/models/tile-state-status';

@Component({
  selector: 'app-delete-label-confirmation',
  templateUrl: './delete-label-confirmation.component.html',
  styleUrls: ['./delete-label-confirmation.component.scss']
})
export class DeleteLabelConfirmationComponent implements OnInit {
  @Input() msgParam!: {value: string};
  @Input() tileStatus!: TileStateStatus;
  @Output() confirmation =  new EventEmitter<{confirm: boolean, option?: number}>();
  btnDisabled: boolean;
  isExpanded: boolean;

  constructor() {
    this.btnDisabled = false;
    this.isExpanded = true;
   }

  ngOnInit(): void {
  }

  confirm(event: Event, option: number): void {
    this.confirmation.emit({confirm: true, option: option});
    this.afterBtnClick(event);
  }

  cancel(event: Event): void {
    this.confirmation.emit({confirm: true});
    this.afterBtnClick(event);
  }

  private afterBtnClick(event: Event): void {
    event.stopPropagation();
    this.btnDisabled = true;
    this.isExpanded = false;
  }
}
