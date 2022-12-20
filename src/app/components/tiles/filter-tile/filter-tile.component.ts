import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { TranslationsFilterFormComponent } from '../../forms/translations-filter-form/translations-filter-form.component';

@Component({
  selector: 'app-filter-tile',
  templateUrl: './filter-tile.component.html',
  styleUrls: ['./filter-tile.component.scss']
})
export class FilterTileComponent implements OnInit {
  @ViewChild('tile') tile!: any;

  @ContentChild(TranslationsFilterFormComponent)
    filterContent!: TranslationsFilterFormComponent;

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
    //request from child component onSubmit()?
    this.tile.close();
  }
}
