import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { AppinfoComponent } from './appinfo/appinfo.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent
  },
  {
    path: 'app',
    component: AppinfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
