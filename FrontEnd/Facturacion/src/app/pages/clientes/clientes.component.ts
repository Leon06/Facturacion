import { Component, OnInit } from '@angular/core';

import { Cliente } from './models/cliente';
import { ClienteService } from './service/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cliente!: Cliente;  
  listCliente: Cliente[] = [];
  editar: boolean = false;

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.cliente = {
      // idCliente: 0,
      nombre: '',
      apellido: '',
      cedula: 0,
      correo: '',
      fechaNacimiento: new Date()
    }

    this.getListClientes()
  }


  getListClientes() {
    this.clienteService.getClients().subscribe(res => {
      this.listCliente = res;
    })
  }

  addCliente() {
    this.clienteService.addClient(this.cliente).subscribe(res => {      
      console.log(res, 'Registro exitoso');
    })
  }

  update() {
    this.clienteService.updateClient(this.cliente).subscribe(res => {
      this.editar = false;
      this.cliente = new Cliente();
      console.log(res, 'Actualizacion exitosa')
    })
  }

  remove(data: any) {
    console.log(data.key)
    this.clienteService.deleteClient(data.key).subscribe(res => {
      this.listCliente = this.listCliente.filter(x => x.idCliente != data.key.idCliente)
      
    })
  }

  startEdit(e: any) {
    this.cliente = e.key
    this.editar = true;
  }


}
