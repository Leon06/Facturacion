import { Component, OnInit } from '@angular/core';
import { Producto } from './models/Producto';
import { ProductoService } from './service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  producto!: Producto;
  listProducto: Producto[] = [];
  editar: boolean = false;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.producto ={
    nombre:'',
    precio:0,      
    }

    this.getListProductos()
  }

  getListProductos() {
    this.productoService.getProductos().subscribe(res => {
      this.listProducto = res;
    })
  }

  addProducto() {
    this.productoService.addProducto(this.producto).subscribe(res => {
      console.log(res, 'Registro exitoso')
    })
  }

  updateProducto() {
    this.productoService.updateProducto(this.producto).subscribe(res => {
      this.editar = false;
      this.producto = new Producto();
      console.log(res, 'Actualizacion exitosa')
    })
  }

  remove(data: any) {
    console.log(data.key)
    this.productoService.deleteProducto(data.key).subscribe(res => {
      this.listProducto = this.listProducto.filter(x => x.idProducto != data.key.idProducto)
    })
  }

  startEdit(e: any) {
    this.producto = e.key
    this.editar = true;
  }


  

}
