import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';


@NgModule({
  declarations: [
    CampaignComponent,
    AddCampaignComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule
  ]
})
export class CampaignModule { }
