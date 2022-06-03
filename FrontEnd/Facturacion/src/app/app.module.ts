import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { DxButtonModule } from 'devextreme-angular';
import { HomeModule } from './pages/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientesModule } from './pages/clientes/clientes.module';
import { ProductosModule } from './pages/productos/productos.module';
import { FacturasModule } from './pages/facturas/facturas.module';


@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    ClientesModule,
    ProductosModule,
    FacturasModule,
    // BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
