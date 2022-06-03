import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule, DxFormModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [    
    CommonModule,
    BrowserModule,
    DxDataGridModule,
    DxFormModule,
    DxButtonModule
  ]
})
export class ProductosModule { }
