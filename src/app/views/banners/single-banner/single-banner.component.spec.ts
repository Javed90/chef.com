import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBannerComponent } from './single-banner.component';

describe('SingleBannerComponent', () => {
  let component: SingleBannerComponent;
  let fixture: ComponentFixture<SingleBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
