import { Component, OnInit, OnDestroy } from '@angular/core';

import { ItemListService } from './../item-list/item-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-broken',
  templateUrl: './broken.component.html',
  styleUrls: ['./broken.component.css']
})
export class BrokenComponent implements OnInit, OnDestroy {
  showBrokenUrls = false;
  buttonDisabled = false;
  subscription: Subscription;

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {}

  onShowBrokenUrls(): any {
    this.buttonDisabled = true;
    this.showBrokenUrls = true;
    this.itemListService.returnBrokenUrls.next(true);

    this.subscription = this.itemListService.showBrokenUrls.subscribe((condition: boolean) => {
      if (condition) {
        this.buttonDisabled = false;
      } else {
        this.buttonDisabled = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.itemListService.returnBrokenUrls.next(false);
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
