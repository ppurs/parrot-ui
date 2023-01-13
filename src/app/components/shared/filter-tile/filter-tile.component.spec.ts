import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTileComponent } from './filter-tile.component';

describe('FilterTileComponent', () => {
  let component: FilterTileComponent;
  let fixture: ComponentFixture<FilterTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
