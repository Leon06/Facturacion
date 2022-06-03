import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService { 

  constructor(private _http:HttpClient) { }

  getClients(): Observable<any> {
    return this._http.get(`${environment.baseUrl}${environment.apiUrlClientes}`);
  }

  addClient(cliente: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(`${environment.baseUrl}${environment.apiUrlClientes}`, cliente);
  }

  updateClient(cliente: Cliente): Observable<Cliente> {
    return this._http.put<Cliente>(`${environment.baseUrl}${environment.apiUrlClientes}/${cliente.idCliente}`, cliente);
  }


  deleteClient(cliente: Cliente): Observable<Cliente> {
    return this._http.delete<Cliente>(`${environment.baseUrl}${environment.apiUrlClientes}/${cliente.idCliente}`);
  }

}
