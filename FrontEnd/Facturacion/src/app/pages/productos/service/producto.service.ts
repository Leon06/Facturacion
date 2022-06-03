import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http:HttpClient) { }

  getProductos(): Observable<any[]> {
    return this._http.get<any>(`${environment.baseUrl}${environment.apiUrlProductos}`);
  }

  addProducto(producto: Producto): Observable<Producto> {
    return this._http.post<Producto>(`${environment.baseUrl}${environment.apiUrlProductos}`, producto);
  }

  updateProducto(producto: Producto): Observable<Producto> {
    return this._http.put<Producto>(`${environment.baseUrl}${environment.apiUrlProductos}`, producto);
  }



  deleteProducto(producto: Producto): Observable<Producto> {
    return this._http.delete<Producto>(`${environment.baseUrl}${environment.apiUrlProductos}/${producto.idProducto}`);
  }

}
