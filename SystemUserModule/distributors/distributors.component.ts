import { Component, OnInit } from '@angular/core';
import { Distributor } from '../../Models/distributor';
import { DistributorsService } from '../../Services/distributors.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.scss']
})
export class DistributorsComponent extends InventoryComponentBase implements OnInit {
  distributors: Distributor[] = [];
  showDistributorsSpinner: boolean = false;
  viewDistributorCheckBoxes: any;

  sortBy: string = "distributorName";
  sortDirection: string = "ASC";

  newDistributorForm: FormGroup;
  newDistributorDisabled: boolean = false;
  newDistributorFormErrorMessages: any;

  editDistributorForm: FormGroup;
  editDistributorDisabled: boolean = false;
  editDistributorFormErrorMessages: any;

  deleteDistributorForm: FormGroup;
  deleteDistributorDisabled: boolean = false;

  constructor(private distributorsService: DistributorsService) {
    super();
    this.newDistributorForm = new FormGroup({
      distributorName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      distributorMobile: new FormControl(null, [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/)])
    });

    this.newDistributorFormErrorMessages = {
      distributorName: { required: "Distributor Name can't be blank", minlength: "Distributor Name should contain at least 2 characters", maxlength: "Distributor Name can't be longer than 40 characters" },
      distributorMobile: { required: "Mobile number can't be blank", pattern: "10 digit Mobile number is required" },
      email: { required: "Email can't be blank", pattern: "Email is invalid" },
      password: { required: "Password can't be blank", pattern: "Password should contain should be between 6 to 15 characters long, with at least one uppercase letter, one lowercase letter and one digit" }
    };



    this.editDistributorForm = new FormGroup({
      id: new FormControl(null),
      distributorID: new FormControl(null),
      distributorName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      distributorMobile: new FormControl(null, [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null),
      creationDateTime: new FormControl(null)
    });

    this.editDistributorFormErrorMessages = {
      distributorName: { required: "Distributor Name can't be blank", minlength: "Distributor Name should contain at least 2 characters", maxlength: "Distributor Name can't be longer than 40 characters" },
      distributorMobile: { required: "Mobile number can't be blank", pattern: "10 digit Mobile number is required" },
      email: { required: "Email can't be blank", pattern: "Email is invalid" }
    };

    this.viewDistributorCheckBoxes = {
      distributorName: true,
      mobile: true,
      email: true,
      createdOn: true,
      lastModifiedOn: true
    };

    this.deleteDistributorForm = new FormGroup({
      id: new FormControl(null),
      distributorID: new FormControl(null),
      distributorName: new FormControl(null)
    });
  }

  ngOnInit() {
    this.showDistributorsSpinner = true;
    this.distributorsService.GetAllDistributors().subscribe((response) => {
      this.distributors = response;
      this.showDistributorsSpinner = false;
    }, (error) => {
      console.log(error);
    })
  }

  onCreateDistributorClick() {
    this.newDistributorForm.reset();
    this.newDistributorForm["submitted"] = false;
  }

  onAddDistributorClick(event) {
    this.newDistributorForm["submitted"] = true;
    if (this.newDistributorForm.valid) {
      this.newDistributorDisabled = true;
      var distributor: Distributor = this.newDistributorForm.value;

      this.distributorsService.AddDistributor(distributor).subscribe((addResponse) => {
        this.newDistributorForm.reset();
        $("#btnAddDistributorCancel").trigger("click");
        this.newDistributorDisabled = false;
        this.showDistributorsSpinner = true;

        this.distributorsService.GetAllDistributors().subscribe((getResponse) => {
          this.showDistributorsSpinner = false;
          this.distributors = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newDistributorDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newDistributorForm);
    }
  }



  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newDistributorFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }



  onEditDistributorClick(index) {
    this.editDistributorForm.reset();
    this.editDistributorForm["submitted"] = false;
    this.editDistributorForm.patchValue({
      id: this.distributors[index].id,
      distributorID: this.distributors[index].distributorID,
      distributorName: this.distributors[index].distributorName,
      distributorMobile: this.distributors[index].distributorMobile,
      email: this.distributors[index].email,
      password: this.distributors[index].password,
      creationDateTime: this.distributors[index].creationDateTime
    });
  }

  onUpdateDistributorClick(event) {
    this.editDistributorForm["submitted"] = true;
    if (this.editDistributorForm.valid) {
      this.editDistributorDisabled = true;
      var distributor: Distributor = this.editDistributorForm.value;

      this.distributorsService.UpdateDistributor(distributor).subscribe((updateResponse) => {
        this.editDistributorForm.reset();
        $("#btnUpdateDistributorCancel").trigger("click");
        this.editDistributorDisabled = false;
        this.showDistributorsSpinner = true;

        this.distributorsService.GetAllDistributors().subscribe((getResponse) => {
          this.showDistributorsSpinner = false;
          this.distributors = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editDistributorDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editDistributorForm);
    }
  }



  onDeleteDistributorClick(index) {
    this.deleteDistributorForm.reset();
    this.deleteDistributorForm["submitted"] = false;
    this.deleteDistributorForm.patchValue({
      id: this.distributors[index].id,
      distributorID: this.distributors[index].distributorID,
      distributorName: this.distributors[index].distributorName
    });
  }

  onDeleteDistributorConfirmClick(event) {
    this.deleteDistributorForm["submitted"] = true;
    if (this.deleteDistributorForm.valid) {
      this.deleteDistributorDisabled = true;
      var distributor: Distributor = this.deleteDistributorForm.value;

      this.distributorsService.DeleteDistributor(distributor.distributorID, distributor.id).subscribe((deleteResponse) => {
        this.deleteDistributorForm.reset();
        $("#btnDeleteDistributorCancel").trigger("click");
        this.deleteDistributorDisabled = false;
        this.showDistributorsSpinner = true;

        this.distributorsService.GetAllDistributors().subscribe((getResponse) => {
          this.showDistributorsSpinner = false;
          this.distributors = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteDistributorDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteDistributorForm);
    }
  }



  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewDistributorCheckBoxes)) {
      this.viewDistributorCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewDistributorCheckBoxes)) {
      this.viewDistributorCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    console.log(this.sortBy);
    this.distributors.sort((a, b) => {
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



