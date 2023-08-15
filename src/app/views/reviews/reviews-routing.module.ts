import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeletedReviewsComponent } from './deleted-reviews/deleted-reviews.component';
import { PublishedReviewsComponent } from './published-reviews/published-reviews.component';
import { ReviewsComponent } from './reviews.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent
  },{
    path: 'published-reviews',
    component: PublishedReviewsComponent
  },{
    path: 'deleted-reviews',
    component: DeletedReviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
