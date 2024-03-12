import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRentalHistoryComponent } from './customer-rental-history.component';

describe('CustomerRentalHistoryComponent', () => {
  let component: CustomerRentalHistoryComponent;
  let fixture: ComponentFixture<CustomerRentalHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerRentalHistoryComponent]
    });
    fixture = TestBed.createComponent(CustomerRentalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
