import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOverTimeComponent } from './customer-over-time.component';

describe('CustomerOverTimeComponent', () => {
  let component: CustomerOverTimeComponent;
  let fixture: ComponentFixture<CustomerOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOverTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
