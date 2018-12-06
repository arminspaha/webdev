import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ItemListService } from './../item-list/item-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild('urlForm') addUrlForm: NgForm;
  constructor(
    private itemListService: ItemListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.itemListService.submit(this.addUrlForm).subscribe(
      () => {
        this.addUrlForm.reset();
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    );
  }
}
