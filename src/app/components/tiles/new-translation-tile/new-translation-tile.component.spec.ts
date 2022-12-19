import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTranslationTileComponent } from './new-translation-tile.component';

describe('NewTranslationTileComponent', () => {
  let component: NewTranslationTileComponent;
  let fixture: ComponentFixture<NewTranslationTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTranslationTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTranslationTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
