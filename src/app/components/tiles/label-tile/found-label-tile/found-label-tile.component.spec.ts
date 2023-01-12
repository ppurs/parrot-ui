import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundLabelTileComponent } from './found-label-tile.component';

describe('FoundLabelTileComponent', () => {
  let component: FoundLabelTileComponent;
  let fixture: ComponentFixture<FoundLabelTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundLabelTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundLabelTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
