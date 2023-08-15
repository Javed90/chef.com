import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByProductsComponent } from './sales-by-products.component';

describe('SalesByProductsComponent', () => {
  let component: SalesByProductsComponent;
  let fixture: ComponentFixture<SalesByProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesByProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesByProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
