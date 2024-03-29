import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, Observable, of, pairwise, startWith, Subscription, take } from 'rxjs';
import { FilterForm } from 'src/app/models/filter-form';
import { LabelProperties } from 'src/app/models/label-properties';
import { TranslationFilterHints } from 'src/app/models/translation-filter-hints';
import { TranslationsFilter } from 'src/app/models/translations-filter';
import { WordType } from 'src/app/models/word-type';
import { FacadeService } from 'src/app/services/facade/facade.service';

const NO_LABEL_OPTION: LabelProperties = {
  labelId: 0,
  labelName: "No label",
  colorCode: '',
}

@Component({
  selector: 'app-translations-filter-form',
  templateUrl: './translations-filter-form.component.html',
  styleUrls: ['./translations-filter-form.component.scss']
})
export class TranslationsFilterFormComponent extends FilterForm implements OnInit {
  @Output()
  filterApplied = new EventEmitter<TranslationsFilter>();   
  
  filterForm = this.fb.group({
    fromLang: [''],
    toLang: [''],
    types: [<number[]><unknown>undefined],
    labels: [<LabelProperties[]><unknown>undefined]
  });

  filteredWordFromHints!: Observable<string[]>;
  filteredWordToHints!: Observable<string[]>;

  Labels: LabelProperties[]; 
  Types: WordType[]; 

  private labelsSubscription?: Subscription;
  private wordFromHints: string[];
  private wordToHints: string[];
  private wordTypesSubscrition?: Subscription;
  private labelsChanged: boolean;

  constructor( private facade: FacadeService,
               private fb: FormBuilder ) {
                super();
    this.Types = [];
    //this.Labels = [NO_LABEL_OPTION];
    this.Labels = [];

    this.wordFromHints = [];
    this.wordToHints = [];
    this.labelsChanged = false;
   }

   get fromLang() {
    return this.filterForm.get('fromLang');
   }

   get toLang() {
    return this.filterForm.get('toLang');
   }

   get types() {
    return this.filterForm.get('types');
   }

   get labels() {
    return this.filterForm.get('labels');
   }

  ngOnInit(): void {
    this.getTypes();
    this.getLabels();

    this.wordTypesSubscrition = this.types?.valueChanges.subscribe( val => this.onWordTypesChange(val));

     this.labelsSubscription = this.labels?.valueChanges.pipe(startWith([],[]),pairwise()).subscribe( ([prev, next]) =>
        this.onLabelsChange( prev, next )
    );

    this.filteredWordFromHints = this.fromLang?.valueChanges.pipe(
      startWith(''),
      map( val => {
        return val && !this.labelsChanged ? this.filterHints( val, this.wordFromHints ) : this.wordFromHints.slice();
      })
    ) ?? of([]);

    this.filteredWordToHints = this.toLang?.valueChanges.pipe(
      startWith(''),
      map( val => {
        return val && !this.labelsChanged ? this.filterHints( val, this.wordToHints ) : this.wordToHints.slice();
      })
    ) ?? of([]);
  }

  ngOnDestroy(): void {
    this.wordTypesSubscrition?.unsubscribe();
    this.labelsSubscription?.unsubscribe();
  }

  onSubmit(): void {
    //const labelIds = this.labels?.value?.includes( NO_LABEL_OPTION.labelId! ) ? [] : this.labels?.value;

    const payload: TranslationsFilter = {
      wordFromPrefix: this.fromLang?.value ?? undefined,
      wordToPrefix: this.toLang?.value ?? undefined,
      wordTypeIds: this.types?.value ?? undefined,
      labelIds: this.labels?.value?.flatMap( label => label.labelId ? [label.labelId] : []) ?? undefined,
    }

    this.filterApplied.emit(payload);
  }

  private clearHints(): void {
    this.wordFromHints = [];
    this.wordToHints = [];
  }

  private filterHints(word: string, list: string[]): string[] {
    const filterValue = word.toLowerCase();

    return list.filter( hint => hint.toLowerCase().includes(filterValue));
  }

  private getTypes(): void {
    this.Types = this.facade.getWordTypes();
  }

  private getFilterHints( payload: TranslationFilterHints ): void {  
    this.facade.getTranslationsLangFromHints(payload).subscribe( res => {
      this.wordFromHints = res;
  
    });
 
    this.facade.getTranslationsLangToHints(payload).subscribe( res => {
      this.wordToHints = res;
    });
  }

  private getLabels(): void {
    this.facade.getLabelSelectList().pipe(take(1)).subscribe( res => {
      this.Labels.push(...res);
    })
  }

  private onWordTypesChange( val: number[] | null ): void {
    if ( ( !this.labels?.value || ( this.labels?.value && this.labels?.value.length == 0 ) ) 
          && ( val?.length && val.length > 0 ) ) {
      const payload: TranslationFilterHints = {
        filters: {
          wordTypeIds: val
        }
      }

      this.labelsChanged = false;
      this.getFilterHints(payload);
    } 
    else {
      this.clearHints();
    }
  }

  private onLabelsChange( prev: LabelProperties[] | null | undefined, next: LabelProperties[] | null | undefined ): void {

    if( next && next.length > 0 ) {
      this.labelsChanged = true;
      this.clearHints();
    } 
    else {
      if ( this.types?.value  ) {
        this.labelsChanged = false;
        this.onWordTypesChange( this.types?.value );
      }
    }

    if( !prev || !next ) {
      return;
    }

    /*if( prev.length == 1 && prev[0] == NO_LABEL_OPTION.labelId! ) {
      this.labels?.setValue( [ next[1] ] );
      this.clearHints();
    }
    else if( next.length > 1 && next[ 0 ] == NO_LABEL_OPTION.labelId! ) {
      this.labels?.setValue([ NO_LABEL_OPTION.labelId! ]);
    }*/
  }

}
