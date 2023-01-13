import { ChangeDetectorRef, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Label } from 'src/app/models/label';
import { NewLabelTileComponent } from '../label-tile/new-label-tile/new-label-tile.component';
@Component({
  selector: 'app-add-labels',
  templateUrl: './add-labels.component.html',
  styleUrls: ['./add-labels.component.scss']
})
export class AddLabelsComponent implements OnInit {
  @ViewChild('addedTilesContainer', {read: ViewContainerRef}) addedTilesContainer!: ViewContainerRef;
  addedTiles: Array<ComponentRef<NewLabelTileComponent>> = [];
  
  private addSubscription?: Subscription;
  private copySubscriptions: Subscription[];
  private currentTile!: ComponentRef<any>;

  constructor(private cdref: ChangeDetectorRef) { 
    this.copySubscriptions = [];
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.addTile();
    this.cdref.detectChanges();
  }

  private subscribeAddBtn(tile: ComponentRef<any>) {
    if ( this.addSubscription ) {
      this.addSubscription.unsubscribe();
    }

    this.addSubscription = tile.instance.createNewTile.subscribe( (val: {color: string}) => this.addTile( val?.color ) );
  }

  private subscribeCopyBtn(tile: ComponentRef<any>) {
    const componentRef = this.addedTilesContainer.get(0);

    this.copySubscriptions.push( tile.instance.duplicateFormValues.subscribe( (value: Label) => {
      this.fillActiveTile( value );
    }) 
    );
  }

  addTile( defaultColor?: string ): void {
    const componentClass = NewLabelTileComponent;
    const options = { index: 0 };
    const newTile = this.addedTilesContainer.createComponent(componentClass, options );

    if ( this.addedTilesContainer.length === 1 ) {
      newTile.instance.setFirst();
    }

    if( defaultColor ) {
      newTile.instance.setDefaultColor( defaultColor );
    }
    
    this.subscribeAddBtn(newTile);
    this.subscribeCopyBtn(newTile);

    this.addedTiles.unshift(newTile);
    this.currentTile = newTile;
  }

  clearHistory(): void {
    for( var i = 1; i < this.addedTiles.length; i++ ) {
      this.addedTilesContainer.remove(1);
    }

    this.addedTiles = [ <ComponentRef<NewLabelTileComponent>>this.addedTiles?.at(0) ];
    this.cdref.detectChanges();
  }

  fillActiveTile(content: Label): void {
    this.currentTile.instance.fillTileForm(content);
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    this.copySubscriptions.forEach( sub => sub.unsubscribe() );
  }

}