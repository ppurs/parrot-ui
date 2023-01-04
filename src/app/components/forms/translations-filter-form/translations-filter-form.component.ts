import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterWordsOptions } from 'src/app/models/filter-words-options';
import { WordType } from 'src/app/models/word-type';
import { FacadeService } from 'src/app/services/facade/facade.service';

@Component({
  selector: 'app-translations-filter-form',
  templateUrl: './translations-filter-form.component.html',
  styleUrls: ['./translations-filter-form.component.scss']
})
export class TranslationsFilterFormComponent implements OnInit {
  @Output()
  filterApplied = new EventEmitter<FilterWordsOptions>();
  
  Types: WordType[];

  filterForm = this.fb.group({
    fromLang: [''],
    toLang: [''],
    type: [<number[]><unknown>undefined]
  });

  constructor( private facade: FacadeService,
               private fb: FormBuilder ) {
    this.Types = [];
   }

  ngOnInit(): void {
    this.getTypes();
  }

  onSubmit(): void {
    const payload: FilterWordsOptions = {
      wordFromPrefix: this.filterForm.get('fromLang')?.value ?? undefined,
      wordToPrefix: this.filterForm.get('toLang')?.value ?? undefined,
      wordTypeIds: this.filterForm.get('type')?.value ?? undefined,
    }

    this.filterApplied.emit(payload);
    console.log("child submitted");
  }

  private getTypes(): void {
    this.Types = this.facade.getTermTypes();
  }

}
