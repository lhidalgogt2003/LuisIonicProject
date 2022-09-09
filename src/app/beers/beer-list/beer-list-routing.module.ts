import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeerListPage } from './beer-list.page';

const routes: Routes = [
  {
    path: '',
    component: BeerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeerListPageRoutingModule {}
