import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNewslettersComponent } from './add-edit-newsletters.component';

describe('AddEditNewslettersComponent', () => {
  let component: AddEditNewslettersComponent;
  let fixture: ComponentFixture<AddEditNewslettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditNewslettersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNewslettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
