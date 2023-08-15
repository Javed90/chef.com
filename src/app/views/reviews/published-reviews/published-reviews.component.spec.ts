import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedReviewsComponent } from './published-reviews.component';

describe('PublishedReviewsComponent', () => {
  let component: PublishedReviewsComponent;
  let fixture: ComponentFixture<PublishedReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
