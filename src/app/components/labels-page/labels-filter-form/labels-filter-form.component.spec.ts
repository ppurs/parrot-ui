import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsFilterFormComponent } from './labels-filter-form.component';

describe('LabelsFilterFormComponent', () => {
  let component: LabelsFilterFormComponent;
  let fixture: ComponentFixture<LabelsFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelsFilterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
