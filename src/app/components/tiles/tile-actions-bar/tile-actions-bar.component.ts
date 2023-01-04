import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TileActionBarOptions } from 'src/app/models/tile-action-bar-options';

interface ActionBarButton {
  option?: TileActionBarOptions
  optionName: string,
  iconName: string,
}

const BUTTONS: ActionBarButton[] = [
  { optionName: 'errorInfo', iconName: 'info' },
  { option: TileActionBarOptions.DELETE, optionName: 'delete', iconName: 'delete' },
  { option: TileActionBarOptions.EDIT, optionName: 'edit', iconName: 'edit' },
  { option: TileActionBarOptions.COPY_CONTENT, optionName: 'copyContent', iconName: 'file_copy' }
];

@Component({
  selector: 'app-tile-actions-bar',
  templateUrl: './tile-actions-bar.component.html',
  styleUrls: ['./tile-actions-bar.component.scss']
})
export class TileActionsBarComponent implements OnInit {
  @Input() error: boolean;
  @Input() options: TileActionBarOptions[];
  @Output() selectedAction = new EventEmitter<string>();

  errorInfoBtn?: ActionBarButton;
  availableBtns?: ActionBarButton[];

  constructor() {
    this.error = false;
    this.options = [];
   }

  ngOnInit(): void {
    this.errorInfoBtn = BUTTONS.find( opt => opt.optionName == 'erronInfo' );
    this.loadButtons();
  }

  onErrorInfo(event: Event) {
    if ( this.errorInfoBtn?.optionName )
      this.onActionButtonClick(event, this.errorInfoBtn?.optionName );
  }

  onActionButtonClick(event: Event, msg: string): void {
    this.selectedAction.emit( msg );
    this.disableExpansion(event);
  }

  private disableExpansion(event: Event) {
    event.stopPropagation();
  }

  private loadButtons(): void {
    this.availableBtns = BUTTONS.filter( value => 
          value.option != undefined ? this.options.includes( value.option ) : false );
  }   
}
