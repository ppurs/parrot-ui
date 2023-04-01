import { Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Subscription } from 'rxjs';
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
  formSubscription?: Subscription;
 
  constructor() {
    this.isExpanded = false;
   }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.formSubscription = this.filterContent.closeFilterTile.subscribe( () => this.tile.close() );
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

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
}
