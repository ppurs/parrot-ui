import { Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { FilterForm } from 'src/app/models/filter-form';

@Component({
  selector: 'app-filter-tile',
  templateUrl: './filter-tile.component.html',
  styleUrls: ['./filter-tile.component.scss']
})
export class FilterTileComponent implements OnInit {
  @Input() settings?: MatMenu;

  @ViewChild('tile') tile!: any;

  @ContentChild('filterForm')
    filterContent!: FilterForm;

  isExpanded: boolean;
 
  constructor() {
    this.isExpanded = false;
   }

  ngOnInit(): void {
  }

  changeArrowIcon(): void {
    this.isExpanded = !this.isExpanded;
  }

  onSettings(event: Event): void {
    event.stopPropagation()
  }

  onSubmit(): void {
    this.filterContent.onSubmit();
    this.tile.close();
  }
}
