import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedByComponent } from './rented-by.component';

describe('RentedByComponent', () => {
  let component: RentedByComponent;
  let fixture: ComponentFixture<RentedByComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentedByComponent]
    });
    fixture = TestBed.createComponent(RentedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
