import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { FilterForm } from 'src/app/models/filter-form';
import { LabelProperties } from 'src/app/models/label-properties';
import { TranslationFilterHints } from 'src/app/models/translation-filter-hints';
import { TranslationsFilter } from 'src/app/models/translations-filter';
import { WordType } from 'src/app/models/word-type';
import { FacadeService } from 'src/app/services/facade/facade.service';

@Component({
  selector: 'app-translations-filter-form',
  templateUrl: './translations-filter-form.component.html',
  styleUrls: ['./translations-filter-form.component.scss']
})
export class TranslationsFilterFormComponent implements FilterForm, OnInit {
  @Output()
  filterApplied = new EventEmitter<TranslationsFilter>();
  
  Types: WordType[];
  Labels: LabelProperties[];                        //no label option ???

  filteredWordFromHints!: Observable<string[]>;
  filteredWordToHints!: Observable<string[]>;

  private wordFromHints: string[];
  private wordToHints: string[];

  filterForm = this.fb.group({
    fromLang: [''],
    toLang: [''],
    types: [<number[]><unknown>undefined],
    labels: [<number[]><unknown>undefined]
  });

  constructor( private facade: FacadeService,
               private fb: FormBuilder ) {
    this.Types = [];
    this.Labels = [];

    this.wordFromHints = [];
    this.wordToHints = [];
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
    //this.getLabels();      <------------- TODO 

    this.types?.valueChanges.subscribe( val => {
      if ( ( this.labels?.value && this.labels?.value.length > 0 ) && ( val?.length && val.length > 0 ) ) {
        const payload: TranslationFilterHints = {
          filters: {
            wordTypeIds: val
          }
        }

        this.getFilterHints(payload);
      } 
      else {
        this.wordFromHints = [];
        this.wordToHints = [];
      }
    })

    this.filteredWordFromHints = this.fromLang?.valueChanges.pipe(
      startWith(''),
      map( val => {
        return val ? this.filterHints( val, this.wordFromHints ) : this.wordFromHints.slice();
      })
    ) ?? of([]);

    this.filteredWordToHints = this.toLang?.valueChanges.pipe(
      startWith(''),
      map( val => {
        return val ? this.filterHints( val, this.wordToHints ) : this.wordToHints.slice();
      })
    ) ?? of([]);
  }

  onSubmit(): void {
    const payload: TranslationsFilter = {
      wordFromPrefix: this.fromLang?.value ?? undefined,
      wordToPrefix: this.toLang?.value ?? undefined,
      wordTypeIds: this.types?.value ?? undefined,
      labelIds: this.labels?.value ?? undefined,
    }

    this.filterApplied.emit(payload);
  }

  private getTypes(): void {
    this.Types = this.facade.getTermTypes();
  }

  private getLabels(): void {
    this.facade.getLabelsToTranslationFilter().subscribe( res =>
      this.Labels = res
    );
  }

  private getFilterHints( payload: TranslationFilterHints ): void {  
    this.facade.getTranslationsLangFromHints(payload).subscribe( res => {
      this.wordFromHints = res;
    });
 
    this.facade.getTranslationsLangToHints(payload).subscribe( res => {
      this.wordToHints = res;
    });
  }

  private filterHints(word: string, list: string[]): string[] {
    const filterValue = word.toLowerCase();

    return list.filter( hint => hint.toLowerCase().includes(filterValue));
  }

}
