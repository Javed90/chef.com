import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsComponent } from './reviews.component';
import { PublishedReviewsComponent } from './published-reviews/published-reviews.component';
import { DeletedReviewsComponent } from './deleted-reviews/deleted-reviews.component';



@NgModule({
  declarations: [
    ReviewsComponent,
    PublishedReviewsComponent,
    DeletedReviewsComponent
  ],
  imports: [
    CommonModule,
    ReviewsRoutingModule
  ]
})
export class ReviewsModule { }
