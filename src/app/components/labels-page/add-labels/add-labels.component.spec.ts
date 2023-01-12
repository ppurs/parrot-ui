import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabelsComponent } from './add-labels.component';

describe('AddLabelsComponent', () => {
  let component: AddLabelsComponent;
  let fixture: ComponentFixture<AddLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
