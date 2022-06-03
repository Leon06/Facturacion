import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetDetallesFactura, GetFactura, SaveFactura } from '../models/Factura';
import { DetalleFactura } from '../models/DetalleFactura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private _http:HttpClient) { }


  
  getFacturas(): Observable<any> {
    return this._http.get(`${environment.baseUrl}${environment.apiUrlFactura}`);
  }

  addFactura(factura: SaveFactura): Observable<GetFactura>{
    return this._http.post<GetFactura>(`${environment.baseUrl}${environment.apiUrlFactura}`, factura);
  }

  //l
  getFacturasDetalle(idFactura: number): Observable<DetalleFactura> {
    return this._http.get<DetalleFactura>(`${environment.baseUrl}${environment.apiUrlFacturaDetalle}${idFactura}`);
  }

  updateDetalleFactura(detalle: DetalleFactura): Observable<DetalleFactura> {
    return this._http.put<DetalleFactura>(`${environment.baseUrl}${environment.apiUrlFacturaDetalle}`, detalle);
  }


  getDetallesFactura(id: number){
    return this._http.get<GetDetallesFactura[]>(`${environment.baseUrl}${environment.apiUrlFactura}/${id}`);
  }

  addDetalleFactura(detalle: DetalleFactura): Observable<GetFactura>{
    return this._http.post<GetFactura>(`${environment.baseUrl}${environment.apiUrlFacturaDetalle}`, detalle);
  }
}
