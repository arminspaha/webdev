import { Component, OnInit } from '@angular/core';

import { ItemListService } from './../item-list/item-list.service';

@Component({
  selector: 'app-broken',
  templateUrl: './broken.component.html',
  styleUrls: ['./broken.component.css']
})
export class BrokenComponent implements OnInit {
  showBrokenUrls = false;
  buttonDisabled = false;

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {}

  onShowBrokenUrls() {
    // this.buttonDisabled = true;
    this.showBrokenUrls = true;
    this.itemListService.returnBrokenUrls.next(true);
    /* this.itemListService.showBrokenUrls.subscribe((condition: boolean) => {
      if (condition) {
        this.buttonDisabled = false;
      } else {
        this.buttonDisabled = true;
      }
    }); */
  }
}
