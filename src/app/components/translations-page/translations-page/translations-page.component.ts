import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TranslationsFilter } from 'src/app/models/translations-filter';
import { Translation } from 'src/app/models/translation';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { AddTranslationsComponent } from '../add-translations/add-translations.component';

const DEFAULT_LIMIT: number = 50;

@Component({
  selector: 'app-translations-page',
  templateUrl: './translations-page.component.html',
  styleUrls: ['./translations-page.component.scss']
})
export class TranslationsPageComponent implements OnInit {
  @ViewChild('addedTiles') addedTiles!: AddTranslationsComponent;

  hasMore: boolean;
  isFetchingMoreWords: boolean;
  isLoadingPage: boolean;
  isLoadingList: boolean;
  // service for wordList to async view?
  wordList: Translation[];   
  
  private filter?: TranslationsFilter;
  private limit: number = DEFAULT_LIMIT;
  private offset: number;

  constructor(  private cdref: ChangeDetectorRef,
                private translationService: TranslationService ) {
    this.hasMore = false;
    this.isFetchingMoreWords = false;
    this.isLoadingPage = true;
    this.isLoadingList = true;
    this.offset = 0;
    this.wordList = [];
  }

  ngOnInit(): void {
    this.loadWordTypes();
    this.getWordList();
  }

  applyFilter(event: TranslationsFilter): void {
    this.filter = event;
    this.getWordList();
    this.cdref.detectChanges();
  }

  clearAdditionHistory(): void {
    this.addedTiles.clearHistory();
  }

  deleteTile(event: Translation): void {
    const word: Translation | undefined = this.wordList?.find(obj => obj.translationId == event.translationId );

    if ( word ) {
      const index = this.wordList?.indexOf( word ) ?? -1;

      if ( index != -1 ) {
        console.log(index);
        this.wordList?.splice(index, 1);
        this.cdref.detectChanges();
      }
    }
  }

  fillAdditionTile(event: Translation): void {
    this.addedTiles.fillActiveTile( event );
  }

  loadMoreWords(): void {
    this.isFetchingMoreWords = true;

    this.translationService.getTranslationsList( this.filter, undefined, this.offset ).subscribe(
      res => {
        this.hasMore = res.length < this.limit ? false : true;

        this.wordList.push(...res);
        this.offset += this.limit;
        
        this.isFetchingMoreWords = false;
      }
    );
  }

  private loadWordTypes(): void {
    this.translationService.getWordTypes().subscribe( res => {
    });
  }

  private getWordList(): void {
    this.isLoadingList = true;

    this.translationService.getTranslationsList( this.filter ).subscribe(
      res => {
        this.wordList.push(...res);

        this.hasMore = this.wordList.length < this.limit ? false : true;

        this.offset += this.limit;

        if ( this.isLoadingPage ) {
          this.isLoadingPage = false;
        }
        
        this.isLoadingList = false;
      }
    );
  }

}


