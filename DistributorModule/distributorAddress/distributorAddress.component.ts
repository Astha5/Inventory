import { Component, OnInit } from '@angular/core';
import { DistributorAddress } from '../../Models/distributorAddress';
import { DistributorAddressService } from '../../Services/distributorAddress.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';

@Component({
  selector: 'app-distributorAddress',
  templateUrl: './distributorAddress.component.html',
  styleUrls: ['./distributorAddress.component.scss']
})
export class DistributorAddressComponent extends InventoryComponentBase implements OnInit {
  distributorAddress: DistributorAddress[] = [];
  showDistributorAddressSpinner: boolean = false;
  viewDistributorAddressCheckBoxes: any;

  sortBy: string = "distributorAddressLine1";
  sortDirection: string = "ASC";

  newDistributorAddressForm: FormGroup;
  newDistributorAddressDisabled: boolean = false;
  newDistributorAddressFormErrorMessages: any;

  editDistributorAddressForm: FormGroup;
  editDistributorAddressDisabled: boolean = false;
  editDistributorAddressFormErrorMessages: any;

  deleteDistributorAddressForm: FormGroup;
  deleteDistributorAddressDisabled: boolean = false;

  constructor(private distributorAddressService: DistributorAddressService) {
    super();
    this.newDistributorAddressForm = new FormGroup({
      distributorAddressLine1: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      distributorAddressLine2: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      distributorCity: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      distributorState: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      distributorPincode: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]\d{5}$/)])
    });

    this.newDistributorAddressFormErrorMessages = {
      distributorAddressLine1: { required: "Distributor Address Line1 can't be blank", minlength: "Distributor Address Line1 should contain at least 2 characters", maxlength: "Distributor Address Line1 can't be longer than 40 characters" },
      distributorAddressLine2: { required: "Distributor Address Line2 can't be blank", minlength: "Distributor Address Line2 should contain at least 2 characters", maxlength: "Distributor Address Line2 can't be longer than 40 characters" },
      distributorCity: { required: "Distributor City can't be blank", minlength: "Distributor City should contain at least 2 characters", maxlength: "Distributor City can't be longer than 20 characters" },
      distributorState: { required: "Distributor State can't be blank", minlength: "Distributor State should contain at least 2 characters", maxlength: "Distributor City can't be longer than 20 characters" },
      distributorPincode: { required: "Pincode can't be blank", pattern: "6 digit Pincode is required" }
    };



    this.editDistributorAddressForm = new FormGroup({
      id: new FormControl(null),
      distributorAddressID: new FormControl(null),
      distributorAddressLine1: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      distributorAddressLine2: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      distributorCity: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      distributorState: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      distributorPincode: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]\d{5}$/)]),
      creationDateTime: new FormControl(null)
    });

    this.editDistributorAddressFormErrorMessages = {
      distributorAddressLine1: { required: "Distributor Address Line1 can't be blank", minlength: "Distributor Address Line1 should contain at least 2 characters", maxlength: "Distributor Address Line1 can't be longer than 40 characters" },
      distributorAddressLine2: { required: "Distributor Address Line2 can't be blank", minlength: "Distributor Address Line2 should contain at least 2 characters", maxlength: "Distributor Address Line2 can't be longer than 40 characters" },
      distributorCity: { required: "Distributor City can't be blank", minlength: "Distributor City should contain at least 2 characters", maxlength: "Distributor City can't be longer than 20 characters" },
      distributorState: { required: "Distributor State can't be blank", minlength: "Distributor State should contain at least 2 characters", maxlength: "Distributor City can't be longer than 20 characters" },
      distributorPincode: { required: "Pincode can't be blank", pattern: "6 digit Pincode is required" }
    };

    this.viewDistributorAddressCheckBoxes = {
      distributorAddressLine1: true,
      distributorAddressLine2: true,
      distributorCity: true,
      distributorState: true,
      distributorPincode: true,
      createdOn: true,
      lastModifiedOn: true
    };

    this.deleteDistributorAddressForm = new FormGroup({
      id: new FormControl(null),
      distributorAddressID: new FormControl(null),
      distributorAddressLine1: new FormControl(null),
      distributorAddressLine2: new FormControl(null),
      distributorCity: new FormControl(null),
      distributorState: new FormControl(null),
      distributorPincode: new FormControl(null),
    });
  }

  ngOnInit() {
    this.showDistributorAddressSpinner = true;
    this.distributorAddressService.GetAllDistributorAddress().subscribe((response) => {
      this.distributorAddress = response;
      this.showDistributorAddressSpinner = false;
    }, (error) => {
      console.log(error);
    })
  }

  onCreateDistributorAddressClick() {
    this.newDistributorAddressForm.reset();
    this.newDistributorAddressForm["submitted"] = false;
  }

  onAddDistributorAddressClick(event) {
    this.newDistributorAddressForm["submitted"] = true;
    if (this.newDistributorAddressForm.valid) {
      this.newDistributorAddressDisabled = true;
      var distributorAddress: DistributorAddress = this.newDistributorAddressForm.value;

      this.distributorAddressService.AddDistributorAddress(distributorAddress).subscribe((addResponse) => {
        this.newDistributorAddressForm.reset();
        $("#btnAddDistributorAddressCancel").trigger("click");
        this.newDistributorAddressDisabled = false;
        this.showDistributorAddressSpinner = true;

        this.distributorAddressService.GetAllDistributorAddress().subscribe((getResponse) => {
          this.showDistributorAddressSpinner = false;
          this.distributorAddress = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newDistributorAddressDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newDistributorAddressForm);
    }
  }



  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newDistributorAddressFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }



  onEditDistributorAddressClick(index) {
    this.editDistributorAddressForm.reset();
    this.editDistributorAddressForm["submitted"] = false;
    this.editDistributorAddressForm.patchValue({
      id: this.distributorAddress[index].id,
      distributorAddressID: this.distributorAddress[index].distributorAddressID,
      distributorAddressLine1: this.distributorAddress[index].distributorAddressLine1,
      distributorAddressLine2: this.distributorAddress[index].distributorAddressLine2,
      distributorCity: this.distributorAddress[index].distributorCity,
      distributorState: this.distributorAddress[index].distributorState,
      distributorPincode: this.distributorAddress[index].distributorPincode,
      creationDateTime: this.distributorAddress[index].creationDateTime
    });
  }

  onUpdateDistributorAddressClick(event) {
    this.editDistributorAddressForm["submitted"] = true;
    if (this.editDistributorAddressForm.valid) {
      this.editDistributorAddressDisabled = true;
      var distributorAddress: DistributorAddress = this.editDistributorAddressForm.value;

      this.distributorAddressService.UpdateDistributorAddress(distributorAddress).subscribe((updateResponse) => {
        this.editDistributorAddressForm.reset();
        $("#btnUpdateDistributorAddressCancel").trigger("click");
        this.editDistributorAddressDisabled = false;
        this.showDistributorAddressSpinner = true;

        this.distributorAddressService.GetAllDistributorAddress().subscribe((getResponse) => {
          this.showDistributorAddressSpinner = false;
          this.distributorAddress = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editDistributorAddressDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editDistributorAddressForm);
    }
  }



  onDeleteDistributorAddressClick(index) {
    this.deleteDistributorAddressForm.reset();
    this.deleteDistributorAddressForm["submitted"] = false;
    this.deleteDistributorAddressForm.patchValue({
      id: this.distributorAddress[index].id,
      distributorAddressID: this.distributorAddress[index].distributorAddressID,
      distributorAddressLine1: this.distributorAddress[index].distributorAddressLine1,
      distributorAddressLine2: this.distributorAddress[index].distributorAddressLine2,
      distributorCity: this.distributorAddress[index].distributorCity,
      distributorState: this.distributorAddress[index].distributorState,
      distributorPincode: this.distributorAddress[index].distributorPincode
    });
  }

  onDeleteDistributorAddressConfirmClick(event) {
    this.deleteDistributorAddressForm["submitted"] = true;
    if (this.deleteDistributorAddressForm.valid) {
      this.deleteDistributorAddressDisabled = true;
      var distributorAddress: DistributorAddress = this.deleteDistributorAddressForm.value;

      this.distributorAddressService.DeleteDistributorAddress(distributorAddress.distributorAddressID, distributorAddress.id).subscribe((deleteResponse) => {
        this.deleteDistributorAddressForm.reset();
        $("#btnDeleteDistributorAddressCancel").trigger("click");
        this.deleteDistributorAddressDisabled = false;
        this.showDistributorAddressSpinner = true;

        this.distributorAddressService.GetAllDistributorAddress().subscribe((getResponse) => {
          this.showDistributorAddressSpinner = false;
          this.distributorAddress = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteDistributorAddressDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteDistributorAddressForm);
    }
  }



  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewDistributorAddressCheckBoxes)) {
      this.viewDistributorAddressCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewDistributorAddressCheckBoxes)) {
      this.viewDistributorAddressCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    console.log(this.sortBy);
    this.distributorAddress.sort((a, b) => {
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



