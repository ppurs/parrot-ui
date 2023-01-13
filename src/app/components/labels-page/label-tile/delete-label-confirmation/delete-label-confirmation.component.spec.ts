import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLabelConfirmationComponent } from './delete-label-confirmation.component';

describe('DeleteLabelConfirmationComponent', () => {
  let component: DeleteLabelConfirmationComponent;
  let fixture: ComponentFixture<DeleteLabelConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLabelConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLabelConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
