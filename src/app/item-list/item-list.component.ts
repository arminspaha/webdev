import { Component, OnInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';

import { ItemListService } from './item-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {
  urls: {
    id: number;
    name: string;
    url: string;
    description: string;
    date: Date;
  }[] = [];
  private asc = true;
  private returnBrokenUrl = false;
  private subscription: Subscription;

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {
    this.subscription = this.itemListService.returnBrokenUrls.subscribe(
      (condition: boolean) => {
        if (condition) {
          this.returnBrokenUrl = condition;
          this.itemListService.showBrokenUrls.next(true);
        } else {
          this.itemListService.showBrokenUrls.next(false);
        }
        this.getUrls(this.returnBrokenUrl);
      }
    );
  }

  getUrls(isBroken: boolean): void {
    this.itemListService.getUrls(isBroken).subscribe(
      response => {
        this.sortDataByDate(response);
      },
      error => console.log(error)
    );
  }

  sortDataByDate(urls): void {
    this.urls = _.sortBy(urls, object => moment(object.date)).reverse();
  }

  onUpdateUrlDate(id: number): void {
    this.itemListService
      .updateUrlDate(id)
      .subscribe(
        response => this.sortDataByDate(response),
        error => console.log(error)
      );
  }

  onRemoveUrl(id: number): void {
    this.itemListService
      .removeElement(id)
      .subscribe(
        response => this.sortDataByDate(response),
        error => console.log(error)
      );
  }

  onSortByName(): void {
    this.asc = !this.asc;
    if (this.asc) {
      this.urls = _.sortBy(this.urls, object => object.name);
    } else {
      this.urls = _.sortBy(this.urls, object => object.name).reverse();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
