import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './component/menu/menu.component';
import { BookListComponent } from './component/book-list/book-list.component';
import { TableModule } from "primeng/table";
import { NewBookComponent } from './component/new-book/new-book.component';
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChipsModule} from 'primeng/chips';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BookListComponent,
    NewBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    ChipsModule,
    InputTextModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
