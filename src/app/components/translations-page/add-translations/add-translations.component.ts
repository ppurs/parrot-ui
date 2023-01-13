import { ChangeDetectorRef, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Translation } from 'src/app/models/translation';
import { NewTranslationTileComponent } from '../translation-tile/new-translation-tile/new-translation-tile.component';

@Component({
  selector: 'app-add-translations',
  templateUrl: './add-translations.component.html',
  styleUrls: ['./add-translations.component.scss']
})
export class AddTranslationsComponent implements OnInit {
  @ViewChild('addedTilesContainer', {read: ViewContainerRef}) addedTilesContainer!: ViewContainerRef;
  addedTiles: Array<ComponentRef<NewTranslationTileComponent>> = [];
  
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

    this.addSubscription = tile.instance.createNewTile.subscribe( (val: {labels: number[]}) => this.addTile( val.labels ) );
  }

  private subscribeCopyBtn(tile: ComponentRef<any>) {
    const componentRef = this.addedTilesContainer.get(0);

    this.copySubscriptions.push( tile.instance.duplicateFormValues.subscribe( (value: Translation) => {
      this.fillActiveTile( value );
    }) 
    );
  }

  addTile( defaultLabels?: number[] ): void {
    const componentClass = NewTranslationTileComponent;
    const options = { index: 0 };
    const newTile = this.addedTilesContainer.createComponent(componentClass, options );

    if ( this.addedTilesContainer.length === 1 ) {
      newTile.instance.setFirst();
    }

    newTile.instance.setDefaultLabels( defaultLabels );
    
    this.subscribeAddBtn(newTile);
    this.subscribeCopyBtn(newTile);

    this.addedTiles.unshift(newTile);
    this.currentTile = newTile;
  }

  clearHistory(): void {
    for( var i = 1; i < this.addedTiles.length; i++ ) {
      this.addedTilesContainer.remove(1);
    }

    this.addedTiles = [ <ComponentRef<NewTranslationTileComponent>>this.addedTiles?.at(0) ];
    this.cdref.detectChanges();
  }

  fillActiveTile(content: Translation): void {
    this.currentTile.instance.fillTileForm(content);
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    this.copySubscriptions.forEach( sub => sub.unsubscribe() );
  }

}

