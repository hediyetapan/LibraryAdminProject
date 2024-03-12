import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCustomerComponent } from './search-customer.component';

describe('SearchCustomerComponent', () => {
  let component: SearchCustomerComponent;
  let fixture: ComponentFixture<SearchCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCustomerComponent]
    });
    fixture = TestBed.createComponent(SearchCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
