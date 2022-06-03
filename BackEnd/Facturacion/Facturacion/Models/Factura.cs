using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class Factura
    {
        public Factura()
        {
            FacturaDetalles = new HashSet<FacturaDetalle>();
        }

        public int IdFactura { get; set; }
        public DateTime Fecha { get; set; }
        public int IdCliente { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; } = null!;
        public virtual ICollection<FacturaDetalle> FacturaDetalles { get; set; }
    }
}
