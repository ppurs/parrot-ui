import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDetailsDialogContentComponent } from './error-details-dialog-content.component';

describe('ErrorDetailsDialogContentComponent', () => {
  let component: ErrorDetailsDialogContentComponent;
  let fixture: ComponentFixture<ErrorDetailsDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorDetailsDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorDetailsDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
