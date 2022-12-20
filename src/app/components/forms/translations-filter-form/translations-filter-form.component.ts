import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FacadeService } from 'src/app/services/facade/facade.service';

@Component({
  selector: 'app-translations-filter-form',
  templateUrl: './translations-filter-form.component.html',
  styleUrls: ['./translations-filter-form.component.scss']
})
export class TranslationsFilterFormComponent implements OnInit {
  @Output()
  submitFilter = new EventEmitter();
  
  Types: string[];

  filterForm = this.fb.group({
    fromLang: [''],
    toLang: [''],
    type: ['']
  });

  constructor( private facade: FacadeService,
               private fb: FormBuilder ) {
    this.Types = [];
   }

  ngOnInit(): void {
    this.Types = this.facade.getTermTypes();
  }

  onSubmit(): void {
    //request to backend
    this.submitFilter.emit();
    console.log("child submitted");
  }

}
