import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule, DxFormModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DxDataGridModule,
    DxFormModule,
    DxButtonModule
  ]
  
})
export class ClientesModule { }
