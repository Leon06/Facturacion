using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class FacturaDetalle
    {
        public int IdFacturaDetalle { get; set; }
        public string? Descripcion { get; set; }
        public int IdFactura { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
        public virtual Factura IdFacturaNavigation { get; set; } = null!;
        public virtual Producto IdProductoNavigation { get; set; } = null!;
    }
}
