import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { pairwise, Subscription, take } from 'rxjs';
import { FilterForm } from 'src/app/models/filter-form';
import { LabelProperties } from 'src/app/models/label-properties';
import { QuizFilter } from 'src/app/models/quiz-filter';
import { WordType } from 'src/app/models/word-type';
import { FacadeService } from 'src/app/services/facade/facade.service';

const NO_LABEL_OPTION: LabelProperties = {
  labelId: 0,
  labelName: "No label",
  colorCode: '',
}

@Component({
  selector: 'app-quiz-filter-form',
  templateUrl: './quiz-filter-form.component.html',
  styleUrls: ['./quiz-filter-form.component.scss']
})
export class QuizFilterFormComponent extends FilterForm implements OnInit {
  @Output()
  filterApplied = new EventEmitter<QuizFilter>();

  filterForm = this.fb.group({
    labels: [<LabelProperties[]><unknown>undefined],
    wordTypes: [<number[]><unknown>undefined]
  });
  
  Types: WordType[];
  Labels: LabelProperties[];

  private labelsSubscription?: Subscription;

  constructor( private facade: FacadeService,
               private fb: FormBuilder ) {
              super();
    this.Types = [];
    //this.Labels = [NO_LABEL_OPTION];
    this.Labels = [];
  }

  get wordTypes() {
    return this.filterForm.get('wordTypes');
   }

   get labels() {
    return this.filterForm.get('labels');
   }

  ngOnInit(): void {
    this.getLabels();
    this.getTypes();

    // this.labelsSubscription = this.labels?.valueChanges.pipe(pairwise()).subscribe( ([prev, next]) => {
    //   this.onLabelsChange(prev, next);
    // });
  }

  ngOnDestroy(): void {
    //this.labelsSubscription?.unsubscribe();
  }

  onSubmit(): void {
    //const labelIds = this.labels?.value?.includes( NO_LABEL_OPTION.labelId! ) ? [] : this.labels?.value;
    
    const payload: QuizFilter = {
      labelIds: this.labels?.value?.flatMap(label => label.labelId ? [label.labelId] : [] ) ?? undefined,
      wordTypeIds: this.wordTypes?.value ?? undefined
    }

    this.filterApplied.emit(payload);
  }

  private getLabels(): void {
    this.facade.getLabelSelectList().pipe(take(1)).subscribe( res => {
      this.Labels.push(...res);
    })
  }

  private getTypes(): void {
    this.Types = this.facade.getWordTypes();
  }

  private onLabelsChange( prev: LabelProperties[] | null, next: LabelProperties[] | null ): void {
    if( !prev || !next ) {
      return;
    }

    if( prev.length == 1 && prev[0].labelId == NO_LABEL_OPTION.labelId! ) {
      this.labels?.setValue( [ next[1] ] );
    }
    else if( next.length > 1 && next[ 0 ].labelId == NO_LABEL_OPTION.labelId! ) {
      this.labels?.setValue([ NO_LABEL_OPTION ]);
    }
  }

}
