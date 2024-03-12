import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCurrentRentalsComponent } from './customer-current-rentals.component';

describe('CustomerCurrentRentalsComponent', () => {
  let component: CustomerCurrentRentalsComponent;
  let fixture: ComponentFixture<CustomerCurrentRentalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCurrentRentalsComponent]
    });
    fixture = TestBed.createComponent(CustomerCurrentRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
