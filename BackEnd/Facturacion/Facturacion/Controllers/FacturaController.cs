using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Facturacion.Models;
using Facturacion.DTO;

namespace Facturacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        private readonly FacturacionContext _context;

        public FacturaController(FacturacionContext context)
        {
            _context = context;
        }

        // GET: api/Factura
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Factura>>> GetFacturas()
        {
          if (_context.Facturas == null)
          {
              return NotFound();
          }
          List<Factura> facturas = await _context.Facturas.Include(x => x.IdClienteNavigation)
                                                           .Include(x => x.FacturaDetalles).ToListAsync();
            facturas.Select(x => new Factura
            {
                IdClienteNavigation = new Cliente
                {
                    IdCliente = x.IdCliente,
                    Nombre = x.IdClienteNavigation.Nombre,
                    Apellido = x.IdClienteNavigation.Apellido,

                },
                IdCliente = x.IdCliente,
                IdFactura = x.IdFactura,
                Fecha = x.Fecha,
                FacturaDetalles = x.FacturaDetalles.ToList().Select( y => new FacturaDetalle
                {
                    IdFacturaDetalle = y.IdFacturaDetalle,
                    Descripcion = y.Descripcion,
                }).ToList(),
            });

            return Ok(facturas);
        }

        // GET: api/Factura/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FacturaDetalleResDTO>> GetFactura(int id)
        {
          if (_context.Facturas == null)
          {
              return NotFound();
          }

            var factura = await _context.Facturas
                .Include(f => f.FacturaDetalles)
                .ThenInclude(fd => fd.IdProductoNavigation)
                .Where(f => f.IdFactura == id)
                .FirstAsync();

            List<FacturaDetalleResDTO> detalles = new List<FacturaDetalleResDTO>();

            factura.FacturaDetalles.ToList().ForEach(async fd =>
            {
                FacturaDetalleResDTO detalle = new FacturaDetalleResDTO();
                detalle.NombreProducto = fd.IdProductoNavigation.Nombre;
                detalle.Precio = fd.IdProductoNavigation.Precio;
                detalle.Cantidad = fd.Cantidad;
                detalles.Add(detalle);
            });

            if (factura == null)
            {
                return NotFound();
            }

            return Ok(detalles);
        }

        // PUT: api/Factura/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFactura(int id, Factura factura)
        {
            if (id != factura.IdFactura)
            {
                return BadRequest();
            }

            _context.Entry(factura).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacturaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Factura
        [HttpPost]
        public async Task<ActionResult<Factura>> PostFactura(FacturaDTO factura)
        {
            if (_context.Facturas == null)
            {
                  return Problem("Entity set 'FacturacionContext.Facturas'  is null.");
            }

            Factura facturaObj = new Factura();
            facturaObj.Fecha = factura.Fecha;
            facturaObj.IdCliente = factura.IdCliente;

            _context.Facturas.Add(facturaObj);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFactura", new { id = facturaObj.IdFactura }, facturaObj);
        }

        // DELETE: api/Factura/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFactura(int id)
        {
            if (_context.Facturas == null)
            {
                return NotFound();
            }
            var factura = await _context.Facturas.FindAsync(id);
            if (factura == null)
            {
                return NotFound();
            }

            _context.Facturas.Remove(factura);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FacturaExists(int id)
        {
            return (_context.Facturas?.Any(e => e.IdFactura == id)).GetValueOrDefault();
        }
    }
}
