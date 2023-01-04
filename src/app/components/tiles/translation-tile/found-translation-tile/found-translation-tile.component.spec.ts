import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundTranslationTileComponent } from './found-translation-tile.component';

describe('FoundTranslationTileComponent', () => {
  let component: FoundTranslationTileComponent;
  let fixture: ComponentFixture<FoundTranslationTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundTranslationTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundTranslationTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
