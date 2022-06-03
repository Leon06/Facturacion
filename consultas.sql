CREATE DATABASE facturacion;
USE facturacion;

CREATE TABLE Cliente (
	IdCliente INT IDENTITY(1,1) PRIMARY KEY,
	Nombre VARCHAR(50) NOT NULL,
	Apellido VARCHAR(50) NOT NULL,
	Cedula VARCHAR(50) NOT NULL,
	Correo VARCHAR(50) NOT NULL,
	FechaNacimiento date NOT NULL,	
);

CREATE TABLE Factura (
	IdFactura INT IDENTITY(1,1) PRIMARY KEY,
	Fecha DATE NOT NULL,
	IdCliente INT NOT NULL,	
	CONSTRAINT FK_Factura_Cliente FOREIGN KEY (IdCliente) REFERENCES Cliente(IdCliente)
);


CREATE TABLE Producto (
	IdProducto INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	precio DECIMAL NOT NULL,	
	
);


CREATE TABLE FacturaDetalle (
	IdFacturaDetalle INT IDENTITY(1,1) PRIMARY KEY,
	Precio INT NOT NULL,
	Descripcion VARCHAR(50) NOT NULL,	
	IdProducto INT NOT NULL,
	IdFactura INT NOT NULL,	
	CONSTRAINT FK_FacturaDetalle_Producto FOREIGN KEY (IdProducto) REFERENCES Producto(IdProducto),
	CONSTRAINT FK_FacturaDetalle_Factura  FOREIGN KEY (IdFactura) REFERENCES Factura(IdFactura)
	
	
);

CREATE TABLE Inventario (
	IdInventario INT IDENTITY(1,1) PRIMARY KEY,
	IdProducto INT NOT NULL,
	Cantidad INT NOT NULL,	
	CONSTRAINT FK_Inventario_Producto FOREIGN KEY (IdProducto) REFERENCES Producto(IdProducto)
	
);

-- CONSULTAS --
-- 1. Obtener la lista de precios de todos los productos --

SELECT Nombre,Precio FROM Producto;

-- 2.Obtener la lista de productos cuya existencia en el inventario haya llegado al minimo permitido (5 unidades) --


SELECT Producto.IdProducto, Producto.Nombre , cantidad FROM Producto
LEFT JOIN  Inventario ON Inventario.IdProducto =  Producto.IdProducto
WHERE Inventario.Cantidad <=5;

-- 3.Obtener una lista de clientes no mayores de 35 años que hayan realizado compras entre el 1 de febrero de 2000 y el 25 de mayo de 2000 --

SELECT DISTINCT	Cliente.Cedula,	Cliente.Nombre,	Cliente.Apellido, DATEDIFF(YEAR, FechaNacimiento, GETDATE()) as Edad
FROM Cliente 
LEFT JOIN Factura  ON Cliente.IdCliente = Factura.IdCliente
WHERE (Factura.Fecha BETWEEN '2000-02-01' AND '2000-05-25') 
AND DATEDIFF(YEAR, FechaNacimiento, GETDATE()) < 35;


-- 4. Obtener el valor total vendido por cada producto en el año 2000 --



-- 5.Obtener la ultima fecha de compra de un cliente y segun su frecuencia de compra estimar en que fecha podra volver a comprar.--

use Facturacion;

SELECT 
	Cliente.IdCliente,
	Cliente.Cedula,
	Cliente.Nombre,
	MIN(Factura.Fecha) as 'Primer Compra',
	MAX(Factura.Fecha)as 'Ultima Compra',
	COUNT(Factura.IdFactura)as '# de Compras',	
	DATEADD(DAY, (DATEDIFF(DAY, Min(Factura.Fecha), MAX(Factura.Fecha)) / COUNT(Factura.IdFactura)), MAX(Factura.Fecha))as 'Proxima Compra'
FROM Cliente
LEFT JOIN Factura ON Cliente.IdCliente = Factura.IdCliente
GROUP BY Cliente.IdCliente, Cliente.Cedula, Cliente.Nombre;