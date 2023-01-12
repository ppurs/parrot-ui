import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsPageComponent } from './labels-page.component';

describe('LabelsPageComponent', () => {
  let component: LabelsPageComponent;
  let fixture: ComponentFixture<LabelsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
