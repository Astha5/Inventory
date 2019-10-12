import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DistributorUserHomeComponent } from './distributor-user-home/distributoruser-home.component';
import { DistributorAddressComponent } from './distributorAddress/distributorAddress.component';
import { DistributorUserRoutingModule } from './distributoruser-routing.module';
import { ProductOrderComponent } from './product-order/product-order.component';

@NgModule({
  declarations: [
    DistributorUserHomeComponent,
    DistributorAddressComponent,
    ProductOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DistributorUserRoutingModule
  ],
  exports: [
    DistributorUserRoutingModule,
    DistributorUserHomeComponent,
    DistributorAddressComponent,
    ProductOrderComponent
  ]
})
export class DistributorUserModule { }

