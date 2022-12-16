import { ChangeDetectorRef, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NewTranslationTileComponent } from '../new-translation-tile/new-translation-tile.component';

@Component({
  selector: 'app-add-translations-page',
  templateUrl: './add-translations-page.component.html',
  styleUrls: ['./add-translations-page.component.scss']
})
export class AddTranslationsPageComponent implements OnInit {
  @ViewChild('tileContainer', {read: ViewContainerRef}) tileContainer!: ViewContainerRef;
  tiles: Array<ComponentRef<NewTranslationTileComponent>> = [];

  constructor( private cdref: ChangeDetectorRef ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.addTile();
    this.cdref.detectChanges();
  }



  addTile() {
    const componentClass = NewTranslationTileComponent;
    const options = { index: 0}

    const newTile = this.tileContainer.createComponent(componentClass, options );

    newTile.instance.createNewTile.subscribe( () => this.addTile() );
    this.tiles.unshift(newTile);
  }

 

}
