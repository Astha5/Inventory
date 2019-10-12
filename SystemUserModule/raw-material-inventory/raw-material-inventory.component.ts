import { Component, OnInit } from '@angular/core';
import { RawMaterial } from '../../Models/raw-material';
import { RawMaterialsService } from '../../Services/raw-materials.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  templateUrl: './raw-material-inventory.component.html',
  styleUrls: ['./raw-material-inventory.component.scss']
})
export class RawMaterialComponent extends InventoryComponentBase implements OnInit
{
  rawMaterials: RawMaterial[] = [];
  showRawMaterialSpinner: boolean = false;
  viewRawMaterialCheckBoxes: any;

  sortBy: string = "rawMaterialName";
  sortDirection: string = "ASC";

  newRawMaterialForm: FormGroup;
  newRawMaterialDisabled: boolean = false;
  newRawMaterialFormErrorMessages: any;

  editRawMaterialForm: FormGroup;
  editRawMaterialDisabled: boolean = false;
  editRawMaterialFormErrorMessages: any;

  deleteRawMaterialForm: FormGroup;
  deleteRawMaterialDisabled: boolean = false;

  constructor(private rawMaterialsService: RawMaterialsService, private router: Router) {
    super();
    this.newRawMaterialForm = new FormGroup({
      rawMaterialName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      unitPrice: new FormControl(null, Validators.required),
      minReqdQuantity: new FormControl(null, Validators.required),
      availableQuantity: new FormControl(null, Validators.required)
    });

    this.newRawMaterialFormErrorMessages = {
      rawMaterialName: { required: "Supplier Name can't be blank", minlength: "Supplier Name should contain at least 2 characters", maxlength: "Supplier Name can't be longer than 40 characters" },
      unitPrice: { required: "Unit Price can't be blank" },
      minReqdQuantity: { required: "Minimum Required Quantity can't be blank" },
      availableQuantity: { required: "Available Quantity can't be blank" }
    };

    this.editRawMaterialForm = new FormGroup({
      id: new FormControl(null),
      rawMaterialID: new FormControl(null),
      rawMaterialName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      unitPrice: new FormControl(null, Validators.required),
      minReqdQuantity: new FormControl(null, Validators.required),
      availableQuantity: new FormControl(null, Validators.required)
    });
    this.editRawMaterialFormErrorMessages = {
      rawMaterialName: { required: "Supplier Name can't be blank", minlength: "Supplier Name should contain at least 2 characters", maxlength: "Supplier Name can't be longer than 40 characters" },
      unitPrice: { required: "Unit Price can't be blank" },
      minReqdQuantity: { required: "Minimum Required Quantity can't be blank" },
      availableQuantity: { required: "Available Quantity can't be blank" }
    };

    this.viewRawMaterialCheckBoxes = {
      rawMaterialName: true,
      unitPrice: true,
      minReqdQuantity: true,
      availableQuantity: true,
      quantityRequired: true,
      creationDateTime: true,
      lastModifiedDateTime: true
    };

    this.deleteRawMaterialForm = new FormGroup({
      id: new FormControl(null),
      rawMaterialID: new FormControl(null),
      rawMaterialName: new FormControl(null)
    });
  }
  ngOnInit() {
    this.showRawMaterialSpinner = true;
    this.rawMaterialsService.GetAllRawMaterials().subscribe((response) => {
      this.rawMaterials = response;
      this.showRawMaterialSpinner = false;
    }, (error) => { console.log(error); })
  }
  onCreateRawMaterialClick() {
    this.newRawMaterialForm.reset();
    this.newRawMaterialForm["submitted"] = false;
  }
  onAddRawMaterialClick(event) {

    this.newRawMaterialForm["submitted"] = true;
    if (this.newRawMaterialForm.valid) {
      this.newRawMaterialDisabled = true;
      var rawMaterial: RawMaterial = this.newRawMaterialForm.value;

      this.rawMaterialsService.AddRawMaterial(rawMaterial).subscribe((addResponse) => {
        this.newRawMaterialForm.reset();
        $("#btnAddRawMaterialCancel").trigger("click");
        this.newRawMaterialDisabled = false;
        this.showRawMaterialSpinner = true;

        this.rawMaterialsService.GetAllRawMaterials().subscribe((getResponse) => {
          this.showRawMaterialSpinner = false;
          this.rawMaterials = getResponse;

        }, (error) => { console.log(error) });
      }, (error) => {
        console.log(error);
        this.newRawMaterialDisabled = false;
      });
    }
    else {
      super.getFormGroupErrors(this.newRawMaterialForm);
    }
  }
  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any
  {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }
  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newRawMaterialFormErrorMessages[formControlName][validationProperty];
  }
  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }

  onEditRawMaterialClick(index) {
    this.editRawMaterialForm.reset();
    this.editRawMaterialForm["submitted"] = false;
    this.editRawMaterialForm.patchValue({
      id: this.rawMaterials[index].id,
      rawMaterialID: this.rawMaterials[index].rawMaterialID,
      rawMaterialName: this.rawMaterials[index].rawMaterialName,
      unitPrice: this.rawMaterials[index].unitPrice,
      minReqdQuantity: this.rawMaterials[index].minReqdQuantity,
      availableQuantity: this.rawMaterials[index].availableQuantity,
      creationDateTime: this.rawMaterials[index].creationDateTime,
      lastModifiedDateTime: this.rawMaterials[index].lastModifiedDateTime
    });
  }

  onUpdateRawMaterialClick(event) {
    this.editRawMaterialForm["submitted"] = true;
    if (this.editRawMaterialForm.valid) {
      this.editRawMaterialDisabled = true;
      var rawMaterial: RawMaterial = this.editRawMaterialForm.value;

      this.rawMaterialsService.UpdateRawMaterial(rawMaterial).subscribe((updateResponse) => {
        this.editRawMaterialForm.reset();
        $("#btnUpdateRawMaterialCancel").trigger("click");
        this.editRawMaterialDisabled = false;
        this.showRawMaterialSpinner = true;

        this.rawMaterialsService.GetAllRawMaterials().subscribe((getResponse) => {
          this.showRawMaterialSpinner = false;
          this.rawMaterials = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editRawMaterialDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editRawMaterialForm);
    }
  }
  onDeleteRawMaterialClick(index)
  {
    this.deleteRawMaterialForm.reset();
    this.deleteRawMaterialForm["submitted"] = false;
    this.deleteRawMaterialForm.patchValue({
      id: this.rawMaterials[index].id,
      rawMaterialID: this.rawMaterials[index].rawMaterialID,
      rawMaterialName: this.rawMaterials[index].rawMaterialName
    });
  }
  onDeleteRawMaterialConfirmClick(event) {
    this.deleteRawMaterialForm["submitted"] = true;
    if (this.deleteRawMaterialForm.valid) {
      this.deleteRawMaterialDisabled = true;
      var rawMaterial: RawMaterial = this.deleteRawMaterialForm.value;

      this.rawMaterialsService.DeleteRawMaterial(rawMaterial.rawMaterialID, rawMaterial.id).subscribe((deleteResponse) => {
        this.deleteRawMaterialForm.reset();
        $("#btnDeleteRawMaterialCancel").trigger("click");
        this.deleteRawMaterialDisabled = false;
        this.showRawMaterialSpinner = true;

        this.rawMaterialsService.GetAllRawMaterials().subscribe((getResponse) => {
          this.showRawMaterialSpinner = false;
          this.rawMaterials = getResponse;
        }, (error) => {
            console.log(error);
          });
      },
        (error) => {
          console.log(error);
          this.deleteRawMaterialDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteRawMaterialForm);
    }
  }
  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewRawMaterialCheckBoxes)) {
      this.viewRawMaterialCheckBoxes[propertyName] = true;
    }
  }
  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewRawMaterialCheckBoxes)) {
      this.viewRawMaterialCheckBoxes[propertyName] = false;
    }
  }
  onBtnSortClick() {
    this.rawMaterials.sort((a, b) => {
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

      return comparison;
    });

  }
  onCreateOrderClick() {
    console.log("Create Raw Material Order");
    this.router.navigate([ "/systemuser","newrawmaterialorder" ]);
  }
}

