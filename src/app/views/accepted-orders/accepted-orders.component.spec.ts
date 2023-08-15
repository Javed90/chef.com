import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedOrdersComponent } from './accepted-orders.component';

describe('AcceptedOrdersComponent', () => {
  let component: AcceptedOrdersComponent;
  let fixture: ComponentFixture<AcceptedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
