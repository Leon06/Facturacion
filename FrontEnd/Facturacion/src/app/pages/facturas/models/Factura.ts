import { DetalleFactura } from "./DetalleFactura";

export class GetFactura{
    idFactura?: number;
    fecha!: Date;
    idCliente!: number;
    facturaDetalles!: DetalleFactura[];
}

export class GetDetallesFactura{
    nombreProducto!: string;
    precio!: number;
    cantidad!: number;
}

export class SaveFactura {
    fecha!:Date;
    idCliente!:number;
    
    constructor() {
        this.fecha = new Date        
    }
}

export class SaveDetalleFactura {
    idProducto!:number;
    cantidad!: number;
}

export class ProductoDTO {
    idProducto!:number;
    nombreProducto!:string;
}