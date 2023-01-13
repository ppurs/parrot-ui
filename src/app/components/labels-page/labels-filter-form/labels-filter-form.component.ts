import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { FilterForm } from 'src/app/models/filter-form';
import { Option } from 'src/app/models/option';
import { LabelProperties } from 'src/app/models/label-properties';
import { LabelsFilter } from 'src/app/models/labels-filter';
import { FacadeService } from 'src/app/services/facade/facade.service';

@Component({
  selector: 'app-labels-filter-form',
  templateUrl: './labels-filter-form.component.html',
  styleUrls: ['./labels-filter-form.component.scss']
})
export class LabelsFilterFormComponent implements FilterForm, OnInit {
  @Output()
  filterApplied = new EventEmitter<LabelsFilter>();
  
  HierarchyOptions: Option[];
  filteredNameLabels!: Observable<LabelProperties[]>;
  filteredParentNameLabels!: Observable<LabelProperties[]>;

  filterForm = this.fb.group({
    namePrefix: [''],
    parentNamePrefix: [''],
    hierarchyOptions: [<number[]><unknown>undefined]
  })

  private Labels: LabelProperties[];

  constructor( private facade: FacadeService,
               private fb: FormBuilder ) {
    this.Labels = [];
    this.HierarchyOptions = [];
  }

  get namePrefix() {
    return this.filterForm.get('namePrefix');
  }

  get parentNamePrefix(){
    return this.filterForm.get('parentNamePrefix');
  }

  get hierarchyOptions(){
    return this.filterForm.get('hierarchyOptions');
  }

  ngOnInit(): void {
    this.getLabels();
    this.getPlaceInHierarchyOptions();

    this.filteredNameLabels = this.namePrefix?.valueChanges.pipe(
      startWith(''),
      map( val => {
        return val ? this.filterHints( val ) : this.Labels.slice();
      })
    ) ?? of([]);

    this.filteredParentNameLabels = this.parentNamePrefix?.valueChanges.pipe(
      startWith(''),
      map( val => {
        return val ? this.filterHints( val ) : this.Labels.slice();
      })
    ) ?? of([]);
  }

  onSubmit(): void {
    const payload: LabelsFilter = {
      labelNamePrefix: this.namePrefix?.value ?? undefined,
      parentNamePrefix: this.parentNamePrefix?.value ?? undefined,
      placeInHierarchy: this.hierarchyOptions?.value ?? undefined,
    }

    this.filterApplied.emit(payload);
  }

  private filterHints(val: string): LabelProperties[] {
    const filterValue = val.toLowerCase();

    return this.Labels.filter( hint => hint.labelName.toLowerCase().includes(filterValue) );
  }

  private getLabels(): void {
    this.Labels = this.facade.getLabelSelectList();
  }

  private getPlaceInHierarchyOptions(): void {
    this.HierarchyOptions = this.facade.getLabelParentHierarchyOptions();

    const defaultOptions = this.HierarchyOptions
                            .filter(option => option.default == true )
                            ?.map( option => option.id ) ?? [];
                            
    this.hierarchyOptions?.setValue(defaultOptions);
  }

}