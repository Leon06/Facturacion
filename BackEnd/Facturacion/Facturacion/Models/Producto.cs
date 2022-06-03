using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class Producto
    {
        public Producto()
        {
            FacturaDetalles = new HashSet<FacturaDetalle>();
            Inventarios = new HashSet<Inventario>();
        }

        public int IdProducto { get; set; }
        public string Nombre { get; set; } = null!;
        public decimal Precio { get; set; }

        public virtual ICollection<FacturaDetalle> FacturaDetalles { get; set; }
        public virtual ICollection<Inventario> Inventarios { get; set; }
    }
}
