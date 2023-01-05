import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterForm } from 'src/app/models/filter-form';
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

  filterForm = this.fb.group({
    fromLang: [''],
    toLang: [''],
    types: [<number[]><unknown>undefined]
  });

  constructor( private facade: FacadeService,
               private fb: FormBuilder ) {
    this.Types = [];
   }

  ngOnInit(): void {
    this.getTypes();
  }

  onSubmit(): void {
    const payload: TranslationsFilter = {
      wordFromPrefix: this.filterForm.get('fromLang')?.value ?? undefined,
      wordToPrefix: this.filterForm.get('toLang')?.value ?? undefined,
      wordTypeIds: this.filterForm.get('types')?.value ?? undefined,
    }

    this.filterApplied.emit(payload);
  }

  private getTypes(): void {
    this.Types = this.facade.getTermTypes();
  }

}
