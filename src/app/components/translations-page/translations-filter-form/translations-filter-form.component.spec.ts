import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsFilterFormComponent } from './translations-filter-form.component';

describe('TranslationsFilterFormComponent', () => {
  let component: TranslationsFilterFormComponent;
  let fixture: ComponentFixture<TranslationsFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationsFilterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationsFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
