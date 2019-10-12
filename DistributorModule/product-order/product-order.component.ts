import { Component, OnInit } from '@angular/core';
import { ProductOrder } from '../../Models/productOrder';
import { ProductOrderService } from '../../Services/product-order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss']
})
export class ProductOrderComponent extends InventoryComponentBase implements OnInit {
  productOrder: ProductOrder[] = [];
  showProductOrderSpinner: boolean = false;
 

 

  newProductOrderForm: FormGroup;
  newProductOrderDisabled: boolean = false;
  newProductOrderFormErrorMessages: any;

 
  deleteProductOrderForm: FormGroup;
  deleteProductOrderDisabled: boolean = false;

  constructor(private productOrderService: ProductOrderService) {
    super();
    this.newProductOrderForm = new FormGroup({
      productName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
     
      unitPrice: new FormControl(null),
      quantity: new FormControl(null)
    });

    this.newProductOrderFormErrorMessages = {
      productName: { required: "Product Name can't be blank", minlength: "Product Name should contain at least 2 characters", maxlength: "Supplier Name can't be longer than 40 characters" },
     
      unitPrice: { required: "can't be zero or negative" },
      quantity: { required: "can't be zero or negative" }
    };

   

    

    this.deleteProductOrderForm = new FormGroup({
      id: new FormControl(null),
      productID: new FormControl(null),
      productName: new FormControl(null),
    
      unitPrice: new FormControl(null),
      quantity: new FormControl(null)
    });
  }

  ngOnInit() {
    this.showProductOrderSpinner = true;
    this.productOrderService.GetAllProductOrders().subscribe((response) => {
      this.productOrder = response;
      this.showProductOrderSpinner = false;
    }, (error) => {
      console.log(error);
    })
  }

  onCreateProductOrderClick() {
    this.newProductOrderForm.reset();
    this.newProductOrderForm["submitted"] = false;
  }

  onAddProductOrderClick(event) {
    this.newProductOrderForm["submitted"] = true;
    if (this.newProductOrderForm.valid) {
      this.newProductOrderDisabled = true;
      var productOrder: ProductOrder = this.newProductOrderForm.value;

      this.productOrderService.AddProductOrder(productOrder).subscribe((addResponse) => {
        this.newProductOrderForm.reset();
        $("#btnAddProductOrderCancel").trigger("click");
        this.newProductOrderDisabled = false;
        this.showProductOrderSpinner = true;

        this.productOrderService.GetAllProductOrders().subscribe((getResponse) => {
          this.showProductOrderSpinner = false;
          this.productOrder = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newProductOrderDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newProductOrderForm);
    }
  }




  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newProductOrderFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }



 



  onDeleteProductOrderClick(index) {
    this.deleteProductOrderForm.reset();
    this.deleteProductOrderForm["submitted"] = false;
    this.deleteProductOrderForm.patchValue({
      id: this.productOrder[index].id,
      productOrderID: this.productOrder[index].productOrderID,
      productName: this.productOrder[index].productName
    });
  }

  onDeleteProductOrderConfirmClick(event) {
    this.deleteProductOrderForm["submitted"] = true;
    if (this.deleteProductOrderForm.valid) {
      this.deleteProductOrderDisabled = true;
      var productOrder: ProductOrder = this.deleteProductOrderForm.value;

      this.productOrderService.DeleteProductOrder(productOrder.productOrderID, productOrder.id).subscribe((deleteResponse) => {
        this.deleteProductOrderForm.reset();
        $("#btnDeleteProductOrderCancel").trigger("click");
        this.deleteProductOrderDisabled = false;
        this.showProductOrderSpinner = true;

        this.productOrderService.GetAllProductOrders().subscribe((getResponse) => {
          this.showProductOrderSpinner = false;
          this.productOrder = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteProductOrderDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteProductOrderForm);
    }
  }



  
  
}



