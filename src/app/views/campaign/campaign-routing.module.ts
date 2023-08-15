import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { CampaignComponent } from './campaign.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignComponent
  },
  {
    path: 'add',
    component: AddCampaignComponent
  },
  {
    path: 'edit/:id',
    component: AddCampaignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
