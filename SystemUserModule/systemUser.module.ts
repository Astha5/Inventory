import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SystemUserHomeComponent } from './systemUser-home/systemUser-home.component';
import { SystemUserRoutingModule } from './systemUser-routing.module'
import { RawMaterialComponent } from './raw-material-inventory/raw-material-inventory.component';
import { NewRawMaterialOrderComponent } from './raw-material-order/raw-material-new-order.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { DistributorsPaymentComponent } from './disPayment/disPayment.component';
import { SuppliersPaymentComponent } from './supPayment/supPayment.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    SystemUserHomeComponent,
    RawMaterialComponent,
    NewRawMaterialOrderComponent,
    SuppliersComponent,
    DistributorsComponent,
    DistributorsPaymentComponent,
    SuppliersPaymentComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SystemUserRoutingModule,  
  ],
  exports:
    [
      SystemUserRoutingModule,
      RawMaterialComponent,
      NewRawMaterialOrderComponent,
      SuppliersComponent,
      DistributorsComponent,
      DistributorsPaymentComponent,
      SuppliersPaymentComponent,
      ProductComponent
    ]
})
export class SystemUserModule { }
