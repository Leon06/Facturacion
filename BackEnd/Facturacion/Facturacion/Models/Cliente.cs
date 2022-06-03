using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Facturas = new HashSet<Factura>();
        }

        public int IdCliente { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public int Cedula { get; set; }
        public string Correo { get; set; } = null!;
        public DateTime FechaNacimiento { get; set; }

        public virtual ICollection<Factura> Facturas { get; set; }
    }
}
