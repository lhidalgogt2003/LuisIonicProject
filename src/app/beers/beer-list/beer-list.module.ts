import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeerListPageRoutingModule } from './beer-list-routing.module';

import { BeerListPage } from './beer-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeerListPageRoutingModule
  ],
  declarations: [BeerListPage]
})
export class BeerListPageModule {}
