import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTranslationsComponent } from './add-translations.component';

describe('AddTranslationsComponent', () => {
  let component: AddTranslationsComponent;
  let fixture: ComponentFixture<AddTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTranslationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
