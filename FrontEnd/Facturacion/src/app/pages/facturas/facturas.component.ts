import { Component, OnInit, ViewChild } from '@angular/core';
import { FacturaService } from './service/factura.service';
import { DetalleFactura } from './models/DetalleFactura';
import { GetDetallesFactura, GetFactura, SaveDetalleFactura, SaveFactura } from './models/Factura';
import { DxDataGridComponent } from 'devextreme-angular';
import { ClienteService } from '../clientes/service/cliente.service';
import { Cliente } from '../clientes/models/cliente';
import { ProductoService } from '../productos/service/producto.service';
import { Producto } from '../productos/models/Producto';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})

export class FacturasComponent implements OnInit {
  editar: boolean = false;
  listFacturas: GetDetallesFactura[] = [];
  listClientes: Cliente[] = [];
  listPoductos: Producto[] = [];
  listDetalleFacturas:[]=[];

  facturas!: GetFactura;
  formFactura: SaveFactura = new SaveFactura();
  formDetalleFactura: SaveDetalleFactura = new SaveDetalleFactura();

  idFactura: number = 0;

  constructor(private facturaService: FacturaService,
    private clienteService: ClienteService,
    private productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.facturas = {
      idFactura: 0,
      facturaDetalles: [],
      fecha: new Date,
      idCliente: 0,
    }
    
    this.getClientes()
    this.getProductos()
  }

  getClientes() {
    this.clienteService.getClients().subscribe(res => {
      console.log(res)
      this.listClientes = res;
    })

  }

  getProductos() {
    this.productoService.getProductos().subscribe(res => {
      console.log(res)
      this.listPoductos = res;
    })

  }

  getFacturas() {
    this.facturaService.getFacturas().subscribe(res => {
      console.log(res)
      this.listFacturas = res;
    })
  }
  
  

  addFactura(){
    this.facturaService.addFactura(this.formFactura).subscribe(res =>{
      console.log("Factura añadida exitosamente", res);
      notify({ message: "Factura añadida exitosamente", width: 800 }, "success", 1500);
      this.idFactura = res.idFactura ? res.idFactura : 0;
    })
  }

  addDetalleFactura() {
    const factura: DetalleFactura = {
      Cantidad: this.formDetalleFactura.cantidad,
      Descripcion: "",
      idFactura: this.idFactura,
      idProducto: this.formDetalleFactura.idProducto,
      idFacturaDetalle: 0,
    }

    this.facturaService.addDetalleFactura(factura).subscribe(res => {      
      console.log(res, 'Registro exitoso');
      this.facturaService.getDetallesFactura(this.idFactura).subscribe(res => {
        this.listFacturas = res;
      })
    })
  }

  
  getTotalProducts = (): number => {
    let total = 0;
    this.listFacturas.forEach(detalle => {
      total += detalle.cantidad * detalle.precio;
    })
    return total;
  }


  startEdit(e: any) {
    this.facturas = e.key
    this.editar = true;
  }




}
