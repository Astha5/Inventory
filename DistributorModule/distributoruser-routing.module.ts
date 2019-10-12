import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistributorUserHomeComponent } from './distributor-user-home/distributoruser-home.component';
import { DistributorAddressComponent } from './distributorAddress/distributorAddress.component';
import { ProductOrderComponent } from './product-order/product-order.component';

const routes: Routes = [
  { path: "home", component: DistributorUserHomeComponent },
  { path: "distributoraddress", component: DistributorAddressComponent },
  { path: "productorder", component: ProductOrderComponent },
  { path: "**", redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributorUserRoutingModule { }


