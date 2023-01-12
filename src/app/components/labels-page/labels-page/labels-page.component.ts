import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Label } from 'src/app/models/label';
import { LabelsFilter } from 'src/app/models/labels-filter';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { AddLabelsComponent } from '../add-labels/add-labels.component';

const DEFAULT_LIMIT: number = 50;

@Component({
  selector: 'app-labels-page',
  templateUrl: './labels-page.component.html',
  styleUrls: ['./labels-page.component.scss']
})
export class LabelsPageComponent implements OnInit {
  @ViewChild('addedTiles') addedTiles!: AddLabelsComponent;

  isFetchingMoreLabels: boolean;
  isLoadingPage: boolean;
  isLoadingList: boolean;
  // service for labelList to async view?
  labelList: Label[];   
  
  private filter?: LabelsFilter;
  private limit: number = DEFAULT_LIMIT;
  private offset: number;

  constructor(  private cdref: ChangeDetectorRef,
                private facade: FacadeService ) {
    this.isFetchingMoreLabels = false;
    this.isLoadingPage = true;
    this.isLoadingList = true;
    this.labelList = [];
    this.offset = 0;
  }

  ngOnInit(): void {
    this.loadLabelSelectList();
    this.loadHierarchyOptions();
    this.getLabelList();
  }

  applyFilter(event: LabelsFilter): void {
    this.filter = event;
    this.labelList = [];
    this.getLabelList();
    this.cdref.detectChanges();
  }

  clearAdditionHistory(): void {
    this.addedTiles.clearHistory();
  }

  deleteTile(event: Label): void {
    const label: Label | undefined = this.labelList?.find(obj => obj.labelId == event.labelId );

    if ( label ) {
      const index = this.labelList?.indexOf( label ) ?? -1;

      if ( index != -1 ) {
        console.log(index);
        this.labelList?.splice(index, 1);
        this.cdref.detectChanges();
      }
    }
  }

  fillAdditionTile(event: Label): void {
    this.addedTiles.fillActiveTile( event );
  }

  getListLength(): number {
    return this.labelList?.length ?? 0;
  }

  loadMoreLabels(): void {
    this.isFetchingMoreLabels = true;

    this.facade.getLabelsList( this.filter, undefined, this.offset ).subscribe(
      res => {
        this.labelList?.concat( res );
        this.offset += this.limit;
        
        this.isFetchingMoreLabels = false;
      }
    );
  }

  private getLabelList(): void {
    this.isLoadingList = true;

    this.facade.getLabelsList( this.filter ).subscribe(
      res => {
        this.labelList.push(...res);
        this.offset += this.limit;

        if ( this.isLoadingPage ) {
          this.isLoadingPage = false;
        }
        
        this.isLoadingList = false;
      }
    );
  }

  private loadHierarchyOptions(): void {
    this.facade.loadLabelHierarchyOptions().subscribe();
  }

  private loadLabelSelectList(): void {
    this.facade.loadLabelSelectList().subscribe();
  }

}


