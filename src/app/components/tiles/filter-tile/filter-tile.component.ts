import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FilterForm } from 'src/app/models/filter-form';

@Component({
  selector: 'app-filter-tile',
  templateUrl: './filter-tile.component.html',
  styleUrls: ['./filter-tile.component.scss']
})
export class FilterTileComponent implements OnInit {
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

  onSubmit(): void {
    this.filterContent.onSubmit();
    this.tile.close();
  }
}
