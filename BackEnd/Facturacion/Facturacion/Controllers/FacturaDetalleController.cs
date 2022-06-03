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
    public class FacturaDetalleController : ControllerBase
    {
        private readonly FacturacionContext _context;

        public FacturaDetalleController(FacturacionContext context)
        {
            _context = context;
        }

        // GET: api/FacturaDetalle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FacturaDetalle>>> GetFacturaDetalles()
        {
          if (_context.FacturaDetalles == null)
          {
              return NotFound();
          }
            return await _context.FacturaDetalles.ToListAsync();
        }

        // GET: api/FacturaDetalle/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FacturaDetalle>> GetFacturaDetalle(int id)
        {
          if (_context.FacturaDetalles == null)
          {
              return NotFound();
          }
            var facturaDetalle = await _context.FacturaDetalles.FindAsync(id);

            if (facturaDetalle == null)
            {
                return NotFound();
            }

            return facturaDetalle;
        }

        // PUT: api/FacturaDetalle/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFacturaDetalle(int id, FacturaDetalle facturaDetalle)
        {
            if (id != facturaDetalle.IdFacturaDetalle)
            {
                return BadRequest();
            }

            _context.Entry(facturaDetalle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacturaDetalleExists(id))
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

        // POST: api/FacturaDetalle
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FacturaDetalle>> PostFacturaDetalle(FacturaDetalleDTO facturaDetalle)
        {
          if (_context.FacturaDetalles == null)
          {
              return Problem("Entity set 'FacturacionContext.FacturaDetalles'  is null.");
          }

            FacturaDetalle fdetalle = new FacturaDetalle();
            fdetalle.IdFacturaDetalle = facturaDetalle.IdFacturaDetalle;
            fdetalle.IdFactura = facturaDetalle.IdFactura;
            fdetalle.Descripcion = fdetalle.Descripcion;
            fdetalle.IdProducto = facturaDetalle.IdProducto;
            fdetalle.Cantidad = facturaDetalle.Cantidad;

            _context.FacturaDetalles.Add(fdetalle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFacturaDetalle", new { id = fdetalle.IdFacturaDetalle }, fdetalle);
        }

        // DELETE: api/FacturaDetalle/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFacturaDetalle(int id)
        {
            if (_context.FacturaDetalles == null)
            {
                return NotFound();
            }
            var facturaDetalle = await _context.FacturaDetalles.FindAsync(id);
            if (facturaDetalle == null)
            {
                return NotFound();
            }

            _context.FacturaDetalles.Remove(facturaDetalle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FacturaDetalleExists(int id)
        {
            return (_context.FacturaDetalles?.Any(e => e.IdFacturaDetalle == id)).GetValueOrDefault();
        }
    }
}
