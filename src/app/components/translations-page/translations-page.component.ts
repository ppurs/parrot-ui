import { ChangeDetectorRef, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NewTranslationTileComponent } from '../tiles/new-translation-tile/new-translation-tile.component';

@Component({
  selector: 'app-translations-page',
  templateUrl: './translations-page.component.html',
  styleUrls: ['./translations-page.component.scss']
})
export class TranslationsPageComponent implements OnInit {
  @ViewChild('tileContainer', {read: ViewContainerRef}) tileContainer!: ViewContainerRef;
  tiles: Array<ComponentRef<NewTranslationTileComponent>> = [];

  constructor( private cdref: ChangeDetectorRef ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.addTile();
    this.cdref.detectChanges();
  }

  private subscribeAddBtn(newTile: ComponentRef<any>) {
    newTile.instance.createNewTile.subscribe( () => this.addTile() );
  }

  private subscribeCopyBtn(newTile: ComponentRef<any>) {
    const componentRef = this.tileContainer.get(0);
    //unsubscribe add button
    newTile.instance.duplicateFormValues.subscribe();
  }


  addTile() {
    const componentClass = NewTranslationTileComponent;
    const options = { index: 0}
    const newTile = this.tileContainer.createComponent(componentClass, options );
    
    this.subscribeAddBtn(newTile);
    this.subscribeCopyBtn(newTile);

    this.tiles.unshift(newTile);
  }
}


//TODO: mozna dodac focus na nowo dodany komponent, najlepiej na term input(?)
//      odsubskrybować adda po dodaniu nowej tile
