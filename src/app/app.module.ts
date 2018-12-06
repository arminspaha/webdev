import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { UrlItemComponent } from './item-list/url-item/url-item.component';
import { AddComponent } from './add/add.component';
import { BrokenComponent } from './broken/broken.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ItemListService } from './item-list/item-list.service';
import { OrderByDatePipe } from './order-by-date.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemListComponent,
    UrlItemComponent,
    AddComponent,
    BrokenComponent,
    ErrorPageComponent,
    OrderByDatePipe
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [ItemListService],
  bootstrap: [AppComponent]
})
export class AppModule {}
