import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';

import { ItemListService } from './item-list.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  urls: {
    id: number;
    name: string;
    url: string;
    description: string;
    date: Date;
  }[] = [];
  private asc = true;
  private returnBrokenUrl = false;

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {
    this.getUrls(this.returnBrokenUrl);
    this.itemListService.returnBrokenUrls.subscribe((condition: boolean) => {
      this.getUrls(condition);
      /* if (condition) {
        this.itemListService.showBrokenUrls.next(true);
      } else {
        this.itemListService.showBrokenUrls.next(false);
      } */
    });

  }

  getUrls(isBroken: boolean) {
    this.itemListService.getUrls(isBroken).subscribe(
      response => {
        this.sortDataByDate(response);
      },
      error => console.log(error));
  }

  sortDataByDate(urls) {
    this.urls = _.sortBy(urls, object => moment(object.date)).reverse();
  }

  onUpdateUrlDate(id: number) {
    this.itemListService
      .updateUrlDate(id)
      .subscribe(
        response => this.sortDataByDate(response),
        error => console.log(error)
      );
  }

  onRemoveUrl(id: number) {
    this.itemListService
      .removeElement(id)
      .subscribe(
        response => this.sortDataByDate(response),
        error => console.log(error)
      );
  }

  onSortByName() {
    this.asc = !this.asc;
    if (this.asc) {
      this.urls = _.sortBy(this.urls, object => object.name);
    } else {
      this.urls = _.sortBy(this.urls, object => object.name).reverse();
    }
  }
}
