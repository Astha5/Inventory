import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';
import { DistributorPayment } from 'src/app/Models/dis-payments';
import { DistributorPaymentService } from 'src/app/Services/dis-payment.service';

@Component({
  selector: 'app-distributorsPayment',
  templateUrl: './disPayment.component.html',
  styleUrls: ['./disPayment.component.scss']
})
export class DistributorsPaymentComponent extends InventoryComponentBase implements OnInit {
  distributorsPayment: DistributorPayment[] = [];
  showDistributorsPaymentSpinner: boolean = false;
  viewDistributorPaymentCheckBoxes: any;

  sortBy: string = "distributorName";
  sortDirection: string = "ASC";

  newDistributorPaymentForm: FormGroup;
  newDistributorPaymentDisabled: boolean = false;
  newDistributorPaymentFormErrorMessages: any;

  editDistributorPaymentForm: FormGroup;
  editDistributorPaymentDisabled: boolean = false;
  editDistributorPaymentFormErrorMessages: any;

  deleteDistributorPaymentForm: FormGroup;
  deleteDistributorPaymentDisabled: boolean = false;

  constructor(private disPaymentService: DistributorPaymentService) {
    super();
    this.newDistributorPaymentForm = new FormGroup({
      distributorName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      prodName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      orderInvoiceCode: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d{3}$/)]),
      disTransNo: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d{5}$/)]),
      paymentMethod: new FormControl(null, [Validators.required]),
      paymentStatus: new FormControl(null, [Validators.required])
    });

    this.newDistributorPaymentFormErrorMessages = {
      distributorName: { required: "Distributor Name can't be blank", minlength: "Distributor Name should contain at least 2 characters", maxlength: "Distributor Name can't be longer than 40 characters" },
      prodName: { required: "Raw Material Name can't be blank", minlength: "Raw Material Name should contain at least 2 characters", maxlength: "Raw Material Name can't be longer than 40 characters" },
      disTransNo: { required: "Transaction Number can't be blank", pattern: "Transaction No. should be of 6 digits." },
      orderInvoiceCode: { required: "Invoice Code can't be blank", pattern: "Invoice Code should be of 4 digits." },
      paymentMethod: { required: "Payment Method can't be blank" },
      paymentStatus: { required: "Payment Status can't be blank" }
    };

    this.editDistributorPaymentForm = new FormGroup({
      id: new FormControl(null),
      distributorName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      prodName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      orderInvoiceCode: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d{3}$/)]),
      disTransNo: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d{5}$/)]),
      paymentMethod: new FormControl(null, [Validators.required]),
      paymentStatus: new FormControl(null, [Validators.required])
    });

    this.editDistributorPaymentFormErrorMessages = {
      distributorName: { required: "Distributor Name can't be blank", minlength: "Distributor Name should contain at least 2 characters", maxlength: "Distributor Name can't be longer than 40 characters" },
      prodName: { required: "Raw Material Name can't be blank", minlength: "Raw Material Name should contain at least 2 characters", maxlength: "Raw Material Name can't be longer than 40 characters" },
      disTransNo: { required: "Transaction Number can't be blank", pattern: "Transaction No. should be of 6 digits." },
      orderInvoiceCode: { required: "Invoice Code can't be blank", pattern: "Invoice Code should be of 4 digits." },
      paymentMethod: { required: "Payment Method can't be blank" },
      paymentStatus: { required: "Payment Status can't be blank" }
    };

    this.viewDistributorPaymentCheckBoxes = {
      orderInvoiceCode: true,
      disTransNo: true,
      prodName: true,
      distributorName: true,
      orderCreationDate: true,
      paymentStatus: true,
      paymentMethod: true
    };

    this.deleteDistributorPaymentForm = new FormGroup({
      id: new FormControl(null),
      distributorName: new FormControl(null),
      prodName: new FormControl(null),
      orderInvoiceCode: new FormControl(0),
      disTransNo: new FormControl(0),
      paymentMethod: new FormControl(null),
      paymentStatus: new FormControl(null)
    });

  }

  ngOnInit() {
    this.showDistributorsPaymentSpinner = true;
    this.disPaymentService.GetAllDistributorsPayment().subscribe((response) => {
      this.distributorsPayment = response;
      this.showDistributorsPaymentSpinner = false;
    }, (error) => {
      console.log(error);
    })
  }

  onCreateDistributorPaymentClick() {
    this.newDistributorPaymentForm.reset();
    this.newDistributorPaymentForm["submitted"] = false;
  }

  onAddDistributorPaymentClick(event) {
    this.newDistributorPaymentForm["submitted"] = true;
    if (this.newDistributorPaymentForm.valid) {
      this.newDistributorPaymentDisabled = true;
      var distributorPayment: DistributorPayment = this.newDistributorPaymentForm.value;

      this.disPaymentService.AddDisPayment(distributorPayment).subscribe((addResponse) => {
        this.newDistributorPaymentForm.reset();
        $("#btnAddDistributorPaymentCancel").trigger("click");
        this.newDistributorPaymentDisabled = false;
        this.showDistributorsPaymentSpinner = true;

        this.disPaymentService.GetAllDistributorsPayment().subscribe((getResponse) => {
          this.showDistributorsPaymentSpinner = false;
          this.distributorsPayment = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newDistributorPaymentDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newDistributorPaymentForm);
    }
  }



  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newDistributorPaymentFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }

  onEditDistributorPaymentClick(index) {
    this.editDistributorPaymentForm.reset();
    this.editDistributorPaymentForm["submitted"] = false;
    this.editDistributorPaymentForm.patchValue({
      id: this.distributorsPayment[index].id,
      orderInvoiceCode: this.distributorsPayment[index].orderInvoiceCode,
      distributorName: this.distributorsPayment[index].distributorName,
      prodName: this.distributorsPayment[index].prodName,
      disTransNo: this.distributorsPayment[index].disTransNo,
      paymentMethod: this.distributorsPayment[index].paymentMethod,
      paymentStatus: this.distributorsPayment[index].paymentStatus
    });
  }

  onUpdateDistributorPaymentClick(event) {

    this.editDistributorPaymentForm["submitted"] = true;
    console.log(this.editDistributorPaymentForm.valid);
    if (this.editDistributorPaymentForm.valid) {
      this.editDistributorPaymentDisabled = true;
      var distributor: DistributorPayment = this.editDistributorPaymentForm.value;
      console.log(distributor.prodName);
      console.log(distributor.id);

      this.disPaymentService.UpdateDistributorPayment(distributor).subscribe((updateResponse) => {
        this.editDistributorPaymentForm.reset();
        $("#btnUpdateDistributorPaymentCancel").trigger("click");
        this.editDistributorPaymentDisabled = false;
        this.showDistributorsPaymentSpinner = true;

        this.disPaymentService.GetAllDistributorsPayment().subscribe((getResponse) => {
          this.showDistributorsPaymentSpinner = false;
          this.distributorsPayment = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editDistributorPaymentDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editDistributorPaymentForm);
    }
  }




  onDeleteDistributorPaymentClick(index) {
    this.deleteDistributorPaymentForm.reset();
    this.deleteDistributorPaymentForm["submitted"] = false;
    this.deleteDistributorPaymentForm.patchValue({
      id: this.distributorsPayment[index].id,
      prodName: this.distributorsPayment[index].prodName,
      distributorName: this.distributorsPayment[index].distributorName,
      disTransNo: this.distributorsPayment[index].distributorName
    });
  }

  onDeleteDistributorPaymentConfirmClick(event) {
    this.deleteDistributorPaymentForm["submitted"] = true;
    if (this.deleteDistributorPaymentForm.valid) {
      this.deleteDistributorPaymentDisabled = true;
      var distributorPayment: DistributorPayment = this.deleteDistributorPaymentForm.value;

      this.disPaymentService.DeleteDistributorPayment(distributorPayment.id).subscribe((deleteResponse) => {
        this.deleteDistributorPaymentForm.reset();
        $("#btnDeleteDistributorPaymentCancel").trigger("click");
        this.deleteDistributorPaymentDisabled = false;
        this.showDistributorsPaymentSpinner = true;

        this.disPaymentService.GetAllDistributorsPayment().subscribe((getResponse) => {
          this.showDistributorsPaymentSpinner = false;
          this.distributorsPayment = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteDistributorPaymentDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteDistributorPaymentForm);
    }
  }



  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewDistributorPaymentCheckBoxes)) {
      this.viewDistributorPaymentCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewDistributorPaymentCheckBoxes)) {
      this.viewDistributorPaymentCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    console.log(this.sortBy);
    this.distributorsPayment.sort((a, b) => {
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



