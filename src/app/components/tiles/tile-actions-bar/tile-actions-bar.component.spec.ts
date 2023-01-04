import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileActionsBarComponent } from './tile-actions-bar.component';

describe('TileActionsBarComponent', () => {
  let component: TileActionsBarComponent;
  let fixture: ComponentFixture<TileActionsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileActionsBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TileActionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
