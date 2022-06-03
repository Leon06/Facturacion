import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturasComponent } from './facturas.component';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxLoadPanelModule, DxToastModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    FacturasComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DxDataGridModule,
    DxFormModule,
    DxButtonModule,
    DxToastModule
  ]
})
export class FacturasModule { }
