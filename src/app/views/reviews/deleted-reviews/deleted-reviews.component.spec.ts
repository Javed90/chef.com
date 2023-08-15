import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedReviewsComponent } from './deleted-reviews.component';

describe('DeletedReviewsComponent', () => {
  let component: DeletedReviewsComponent;
  let fixture: ComponentFixture<DeletedReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
