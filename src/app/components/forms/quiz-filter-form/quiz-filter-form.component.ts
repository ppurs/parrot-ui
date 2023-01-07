import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterForm } from 'src/app/models/filter-form';
import { Label } from 'src/app/models/label';
import { QuizFilter } from 'src/app/models/quiz-filter';
import { WordType } from 'src/app/models/word-type';
import { FacadeService } from 'src/app/services/facade/facade.service';

@Component({
  selector: 'app-quiz-filter-form',
  templateUrl: './quiz-filter-form.component.html',
  styleUrls: ['./quiz-filter-form.component.scss']
})
export class QuizFilterFormComponent implements FilterForm, OnInit {
  @Output()
  filterApplied = new EventEmitter<QuizFilter>();
  
  Types: WordType[];
  Labels: Label[];

  filterForm = this.fb.group({
    labels: [<number[]><unknown>undefined],
    wordTypes: [<number[]><unknown>undefined]
  })

  constructor( private facade: FacadeService,
               private fb: FormBuilder ) {
    this.Types = [];
    this.Labels = [];
  }

  ngOnInit(): void {
    this.getLabels();
    this.getTypes();
  }

  onSubmit(): void {
    const payload: QuizFilter = {
      labelIds: this.filterForm.get('labels')?.value ?? undefined,
      wordTypes: this.filterForm.get('wordTypes')?.value ?? undefined
    }

    this.filterApplied.emit(payload);
  }

  private getLabels(): void {
    //TODO
  }

  private getTypes(): void {
    this.Types = this.facade.getTermTypes();
  }

}
