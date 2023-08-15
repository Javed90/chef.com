import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriesDetailComponent } from './sub-categories-detail.component';

describe('SubCategoriesDetailComponent', () => {
  let component: SubCategoriesDetailComponent;
  let fixture: ComponentFixture<SubCategoriesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoriesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
