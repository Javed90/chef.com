import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByDiscountComponent } from './sales-by-discount.component';

describe('SalesByDiscountComponent', () => {
  let component: SalesByDiscountComponent;
  let fixture: ComponentFixture<SalesByDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesByDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesByDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
