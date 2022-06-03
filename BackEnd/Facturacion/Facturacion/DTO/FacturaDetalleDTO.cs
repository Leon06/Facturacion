namespace Facturacion.DTO
{
    public class FacturaDetalleDTO
    {
        public int IdFacturaDetalle { get; set; }
        public string? Descripcion { get; set; }
        public int IdFactura { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
    }
}
