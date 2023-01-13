import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLabelTileComponent } from './new-label-tile.component';

describe('NewLabelTileComponent', () => {
  let component: NewLabelTileComponent;
  let fixture: ComponentFixture<NewLabelTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLabelTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLabelTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
