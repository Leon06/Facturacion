using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class Inventario
    {
        public int IdInventario { get; set; }
        public int Cantidad { get; set; }
        public int IdProducto { get; set; }

        public virtual Producto IdProductoNavigation { get; set; } = null!;
    }
}
