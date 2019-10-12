import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product';
import { ProductService } from '../../Services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends InventoryComponentBase implements OnInit {
  product: Product[] = [];
  showProductSpinner: boolean = false;
  viewProductCheckBoxes: any;

  sortBy: string = "ProductName";
  sortDirection: string = "ASC";

  newProductForm: FormGroup;
  newProductDisabled: boolean = false;
  newProductFormErrorMessages: any;

  editProductForm: FormGroup;
  editProductDisabled: boolean = false;
  editProductFormErrorMessages: any;

  deleteProductForm: FormGroup;
  deleteProductDisabled: boolean = false;

  constructor(private productService: ProductService) {
    super();
    this.newProductForm = new FormGroup({
      productName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),

      unitPrice: new FormControl(null)
    });

    this.newProductFormErrorMessages = {
      productName: { required: "Product Name can't be blank", minlength: "Product Name should contain at least 2 characters", maxlength: "Supplier Name can't be longer than 40 characters" },

      unitPrice: { required: "can't be zero or negative" }
    };

    this.editProductForm = new FormGroup({
      id: new FormControl(null),
      productID: new FormControl(null),
      productName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),

      unitPrice: new FormControl(null),
      creationDateTime: new FormControl(null)
    });

    this.editProductFormErrorMessages = {
      productName: { required: "product Name can't be blank", minlength: "product Name should contain at least 2 characters", maxlength: "product Name can't be longer than 40 characters" },

      unitPrice: { required: "can't be zero or negative" }
    };

    this.viewProductCheckBoxes = {
      productName: true,

      unitPrice: true,
      createdOn: true,
      lastModifiedOn: true
    };

    this.deleteProductForm = new FormGroup({
      id: new FormControl(null),
      productID: new FormControl(null),
      productName: new FormControl(null),

      unitPrice: new FormControl(null)
    });
  }

  ngOnInit() {
    this.showProductSpinner = true;
    this.productService.GetAllProducts().subscribe((response) => {
      this.product = response;
      this.showProductSpinner = false;
    }, (error) => {
      console.log(error);
    })
  }

  onCreateProductClick() {
    this.newProductForm.reset();
    this.newProductForm["submitted"] = false;
  }

  onAddProductClick(event) {
    this.newProductForm["submitted"] = true;
    if (this.newProductForm.valid) {
      this.newProductDisabled = true;
      var product: Product = this.newProductForm.value;

      this.productService.AddProduct(product).subscribe((addResponse) => {
        this.newProductForm.reset();
        $("#btnAddProductCancel").trigger("click");
        this.newProductDisabled = false;
        this.showProductSpinner = true;

        this.productService.GetAllProducts().subscribe((getResponse) => {
          this.showProductSpinner = false;
          this.product = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newProductDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newProductForm);
    }
  }




  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newProductFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }



  onEditProductClick(index) {
    this.editProductForm.reset();
    this.editProductForm["submitted"] = false;
    this.editProductForm.patchValue({
      id: this.product[index].id,
      productID: this.product[index].productID,
      productName: this.product[index].productName,

      unitPrice: this.product[index].unitPrice,
      creationDateTime: this.product[index].creationDateTime
    });
  }

  onUpdateProductClick(event) {
    this.editProductForm["submitted"] = true;
    if (this.editProductForm.valid) {
      this.editProductDisabled = true;
      var product: Product = this.editProductForm.value;

      this.productService.UpdateProduct(product).subscribe((updateResponse) => {
        this.editProductForm.reset();
        $("#btnUpdateProductCancel").trigger("click");
        this.editProductDisabled = false;
        this.showProductSpinner = true;

        this.productService.GetAllProducts().subscribe((getResponse) => {
          this.showProductSpinner = false;
          this.product = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editProductDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editProductForm);
    }
  }



  onDeleteProductClick(index) {
    this.deleteProductForm.reset();
    this.deleteProductForm["submitted"] = false;
    this.deleteProductForm.patchValue({
      id: this.product[index].id,
      productID: this.product[index].productID,
      productName: this.product[index].productName
    });
  }

  onDeleteProductConfirmClick(event) {
    this.deleteProductForm["submitted"] = true;
    if (this.deleteProductForm.valid) {
      this.deleteProductDisabled = true;
      var product: Product = this.deleteProductForm.value;

      this.productService.DeleteProduct(product.productID, product.id).subscribe((deleteResponse) => {
        this.deleteProductForm.reset();
        $("#btnDeleteProductCancel").trigger("click");
        this.deleteProductDisabled = false;
        this.showProductSpinner = true;

        this.productService.GetAllProducts().subscribe((getResponse) => {
          this.showProductSpinner = false;
          this.product = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteProductDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteProductForm);
    }
  }



  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewProductCheckBoxes)) {
      this.viewProductCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewProductCheckBoxes)) {
      this.viewProductCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    console.log(this.sortBy);
    this.product.sort((a, b) => {
      let comparison = 0;
      let value1 = ((typeof a[this.sortBy]) == 'string') ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      let value2 = ((typeof b[this.sortBy]) == 'string') ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (value1 < value2) {
        comparison = -1;
      }
      else if (value1 > value2) {
        comparison = 1;
      }
      if (this.sortDirection == "DESC")
        comparison = comparison * -1;

      console.log(value1, value2, comparison);
      return comparison;
    });

  }
}



