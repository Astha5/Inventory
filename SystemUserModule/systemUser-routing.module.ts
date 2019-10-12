import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemUserHomeComponent } from './systemUser-home/systemUser-home.component';
import { RawMaterialComponent } from './raw-material-inventory/raw-material-inventory.component';
import { NewRawMaterialOrderComponent } from './raw-material-order/raw-material-new-order.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { SuppliersPaymentComponent } from './supPayment/supPayment.component';
import { DistributorsPaymentComponent } from './disPayment/disPayment.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [ 
  { path: "home", component: SystemUserHomeComponent }, 
  { path: "rawmaterialinventory", component: RawMaterialComponent },
  { path: "newrawmaterialorder", component: NewRawMaterialOrderComponent },
  { path: "suppliers", component: SuppliersComponent },
  { path: "distributors", component: DistributorsComponent },
  { path: "rawmaterialpayment", component: SuppliersPaymentComponent },
  { path: "productpayment", component: DistributorsPaymentComponent },
  { path: "product", component: ProductComponent },
  { path: "**", redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemUserRoutingModule { }
