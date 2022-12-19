import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTranslationsPageComponent } from './translations-page.component';

describe('AddTranslationsPageComponent', () => {
  let component: AddTranslationsPageComponent;
  let fixture: ComponentFixture<AddTranslationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTranslationsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTranslationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
