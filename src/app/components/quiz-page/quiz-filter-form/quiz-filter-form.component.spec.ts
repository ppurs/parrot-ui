import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFilterFormComponent } from './quiz-filter-form.component';

describe('QuizFilterFormComponent', () => {
  let component: QuizFilterFormComponent;
  let fixture: ComponentFixture<QuizFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizFilterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
