import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-systemUser-home',
  templateUrl: './systemUser-home.component.html',
  styleUrls: ['./systemUser-home.component.scss']
})
export class SystemUserHomeComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
  }
  onRawMaterialInventoryClick() {
    console.log("Raw Material Inventory");
    this.router.navigate([ "/systemuser","rawmaterialinventory" ]);
  }
}
