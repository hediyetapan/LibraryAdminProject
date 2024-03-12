import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverBookComponent } from './deliver-book.component';

describe('DeliverBookComponent', () => {
  let component: DeliverBookComponent;
  let fixture: ComponentFixture<DeliverBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliverBookComponent]
    });
    fixture = TestBed.createComponent(DeliverBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
