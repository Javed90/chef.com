import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubCategoriesDetailComponent } from './sub-sub-categories-detail.component';

describe('SubSubCategoriesDetailComponent', () => {
  let component: SubSubCategoriesDetailComponent;
  let fixture: ComponentFixture<SubSubCategoriesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSubCategoriesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSubCategoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
