import { Component, Input, OnInit } from '@angular/core';
import { TileStateStatus } from '../../../models/tile-state-status';

@Component({
  selector: 'app-status-info',
  templateUrl: './status-info.component.html',
  styleUrls: ['./status-info.component.scss']
})
export class StatusInfoComponent implements OnInit {
  @Input() status: TileStateStatus | undefined;

  constructor() { 
    this.status = TileStateStatus.LOADING;
  }

  ngOnInit(): void {
  }

}
