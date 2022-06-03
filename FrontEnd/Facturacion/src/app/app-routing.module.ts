import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { ClientesComponent } from '../app/pages/clientes/clientes.component';
import { FacturasComponent } from '../app/pages/facturas/facturas.component';
import { ProductosComponent } from '../app/pages/productos/productos.component';
import { CoreModule } from './core/core.module';
import { DxFormModule } from 'devextreme-angular';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'facturas', component: FacturasComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxFormModule],
  providers:[CoreModule],
  exports: [RouterModule,CoreModule]
})
export class AppRoutingModule { }
