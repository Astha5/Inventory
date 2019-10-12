import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';
import { SupplierPayment } from 'src/app/Models/sup-payments';
import { SupplierPaymentService } from 'src/app/Services/sup-payment.service';

@Component({
  selector: 'app-suppliersPayment',
  templateUrl: './supPayment.component.html',
  styleUrls: ['./supPayment.component.scss']
})
export class SuppliersPaymentComponent extends InventoryComponentBase implements OnInit {
  suppliersPayment: SupplierPayment[] = [];
  showSuppliersPaymentSpinner: boolean = false;
  viewSupplierPaymentCheckBoxes: any;

  sortBy: string = "supplierName";
  sortDirection: string = "ASC";

  newSupplierPaymentForm: FormGroup;
  newSupplierPaymentDisabled: boolean = false;
  newSupplierPaymentFormErrorMessages: any;

  editSupplierPaymentForm: FormGroup;
  editSupplierPaymentDisabled: boolean = false;
  editSupplierPaymentFormErrorMessages: any;

  deleteSupplierPaymentForm: FormGroup;
  deleteSupplierPaymentDisabled: boolean = false;

  constructor(private supPaymentService: SupplierPaymentService) {
    super();
    this.newSupplierPaymentForm = new FormGroup({
      supplierName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      rawName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      orderInvoiceCode: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d{3}$/)]),
      supTransNo: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d{5}$/)]),
      paymentMethod: new FormControl(null, [Validators.required]),
      paymentStatus: new FormControl(null, [Validators.required])
    });

    this.newSupplierPaymentFormErrorMessages = {
      supplierName: { required: "Supplier Name can't be blank", minlength: "Supplier Name should contain at least 2 characters", maxlength: "Supplier Name can't be longer than 40 characters" },
      rawName: { required: "Raw Material Name can't be blank", minlength: "Raw Material Name should contain at least 2 characters", maxlength: "Raw Material Name can't be longer than 40 characters" },
      supTransNo: { required: "Transaction Number can't be blank", pattern: "Transaction No. should be of 6 digits." },
      orderInvoiceCode: { required: "Invoice Code can't be blank", pattern: "Invoice Code should be of 4 digits." },
      paymentMethod: { required: "Payment Method can't be blank" },
      paymentStatus: { required: "Payment Status can't be blank" }
    };

    this.editSupplierPaymentForm = new FormGroup({
      id: new FormControl(null),
      supplierName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      rawName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      orderInvoiceCode: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d{3}$/)]),
      supTransNo: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d{5}$/)]),
      paymentMethod: new FormControl(null, [Validators.required]),
      paymentStatus: new FormControl(null, [Validators.required])
    });

    this.editSupplierPaymentFormErrorMessages = {
      supplierName: { required: "Supplier Name can't be blank", minlength: "Supplier Name should contain at least 2 characters", maxlength: "Supplier Name can't be longer than 40 characters" },
      rawName: { required: "Raw Material Name can't be blank", minlength: "Raw Material Name should contain at least 2 characters", maxlength: "Raw Material Name can't be longer than 40 characters" },
      supTransNo: { required: "Transaction Number can't be blank", pattern: "Transaction No. should be of 6 digits." },
      orderInvoiceCode: { required: "Invoice Code can't be blank", pattern: "Invoice Code should be of 4 digits." },
      paymentMethod: { required: "Payment Method can't be blank" },
      paymentStatus: { required: "Payment Status can't be blank" }
    };

    this.viewSupplierPaymentCheckBoxes = {
      orderInvoiceCode: true,
      supTransNo: true,
      rawName: true,
      supplierName: true,
      orderCreationDate: true,
      paymentStatus: true,
      paymentMethod: true
    };

    this.deleteSupplierPaymentForm = new FormGroup({
      id: new FormControl(null),
      supplierName: new FormControl(null),
      rawName: new FormControl(null),
      orderInvoiceCode: new FormControl(0),
      supTransNo: new FormControl(0),
      paymentMethod: new FormControl(null),
      paymentStatus: new FormControl(null)
    });

  }

  ngOnInit() {
    this.showSuppliersPaymentSpinner = true;
    this.supPaymentService.GetAllSuppliersPayment().subscribe((response) => {
      this.suppliersPayment = response;
      this.showSuppliersPaymentSpinner = false;
    }, (error) => {
      console.log(error);
    })
  }

  onCreateSupplierPaymentClick() {
    this.newSupplierPaymentForm.reset();
    this.newSupplierPaymentForm["submitted"] = false;
  }

  onAddSupplierPaymentClick(event) {
    this.newSupplierPaymentForm["submitted"] = true;
    if (this.newSupplierPaymentForm.valid) {
      this.newSupplierPaymentDisabled = true;
      var supplierPayment: SupplierPayment = this.newSupplierPaymentForm.value;

      this.supPaymentService.AddSupPayment(supplierPayment).subscribe((addResponse) => {
        this.newSupplierPaymentForm.reset();
        $("#btnAddSupplierPaymentCancel").trigger("click");
        this.newSupplierPaymentDisabled = false;
        this.showSuppliersPaymentSpinner = true;

        this.supPaymentService.GetAllSuppliersPayment().subscribe((getResponse) => {
          this.showSuppliersPaymentSpinner = false;
          this.suppliersPayment = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newSupplierPaymentDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newSupplierPaymentForm);
    }
  }



  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newSupplierPaymentFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }

  onEditSupplierPaymentClick(index) {
    this.editSupplierPaymentForm.reset();
    this.editSupplierPaymentForm["submitted"] = false;
    this.editSupplierPaymentForm.patchValue({
      id: this.suppliersPayment[index].id,
      orderInvoiceCode: this.suppliersPayment[index].orderInvoiceCode,
      supplierName: this.suppliersPayment[index].supplierName,
      rawName: this.suppliersPayment[index].rawName,
      supTransNo: this.suppliersPayment[index].supTransNo,
      paymentMethod: this.suppliersPayment[index].paymentMethod,
      paymentStatus: this.suppliersPayment[index].paymentStatus
    });
  }

  onUpdateSupplierPaymentClick(event) {

    this.editSupplierPaymentForm["submitted"] = true;
    console.log(this.editSupplierPaymentForm.valid);
    if (this.editSupplierPaymentForm.valid) {
      this.editSupplierPaymentDisabled = true;
      var supplier: SupplierPayment = this.editSupplierPaymentForm.value;
      console.log(supplier.rawName);
      console.log(supplier.id);

      this.supPaymentService.UpdateSupplierPayment(supplier).subscribe((updateResponse) => {
        this.editSupplierPaymentForm.reset();
        $("#btnUpdateSupplierPaymentCancel").trigger("click");
        this.editSupplierPaymentDisabled = false;
        this.showSuppliersPaymentSpinner = true;

        this.supPaymentService.GetAllSuppliersPayment().subscribe((getResponse) => {
          this.showSuppliersPaymentSpinner = false;
          this.suppliersPayment = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editSupplierPaymentDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editSupplierPaymentForm);
    }
  }




  onDeleteSupplierPaymentClick(index) {
    this.deleteSupplierPaymentForm.reset();
    this.deleteSupplierPaymentForm["submitted"] = false;
    this.deleteSupplierPaymentForm.patchValue({
      id: this.suppliersPayment[index].id,
      rawName: this.suppliersPayment[index].rawName,
      supplierName: this.suppliersPayment[index].supplierName,
      supTransNo: this.suppliersPayment[index].supplierName
    });
  }

  onDeleteSupplierPaymentConfirmClick(event) {
    this.deleteSupplierPaymentForm["submitted"] = true;
    if (this.deleteSupplierPaymentForm.valid) {
      this.deleteSupplierPaymentDisabled = true;
      var supplierPayment: SupplierPayment = this.deleteSupplierPaymentForm.value;

      this.supPaymentService.DeleteSupplierPayment(supplierPayment.id).subscribe((deleteResponse) => {
        this.deleteSupplierPaymentForm.reset();
        $("#btnDeleteSupplierPaymentCancel").trigger("click");
        this.deleteSupplierPaymentDisabled = false;
        this.showSuppliersPaymentSpinner = true;

        this.supPaymentService.GetAllSuppliersPayment().subscribe((getResponse) => {
          this.showSuppliersPaymentSpinner = false;
          this.suppliersPayment = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteSupplierPaymentDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteSupplierPaymentForm);
    }
  }



  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewSupplierPaymentCheckBoxes)) {
      this.viewSupplierPaymentCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewSupplierPaymentCheckBoxes)) {
      this.viewSupplierPaymentCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    console.log(this.sortBy);
    this.suppliersPayment.sort((a, b) => {
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



