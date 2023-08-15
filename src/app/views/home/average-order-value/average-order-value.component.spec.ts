import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageOrderValueComponent } from './average-order-value.component';

describe('AverageOrderValueComponent', () => {
  let component: AverageOrderValueComponent;
  let fixture: ComponentFixture<AverageOrderValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageOrderValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageOrderValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
