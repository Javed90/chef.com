import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOverTimeComponent } from './sales-over-time.component';

describe('SalesOverTimeComponent', () => {
  let component: SalesOverTimeComponent;
  let fixture: ComponentFixture<SalesOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesOverTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
