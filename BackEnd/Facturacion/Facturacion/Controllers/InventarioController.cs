﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Facturacion.Models;

namespace Facturacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        private readonly FacturacionContext _context;

        public InventarioController(FacturacionContext context)
        {
            _context = context;
        }

        // GET: api/Inventario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inventario>>> GetInventarios()
        {
          if (_context.Inventarios == null)
          {
              return NotFound();
          }
            return await _context.Inventarios.ToListAsync();
        }

        // GET: api/Inventario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Inventario>> GetInventario(int id)
        {
          if (_context.Inventarios == null)
          {
              return NotFound();
          }
            var inventario = await _context.Inventarios.FindAsync(id);

            if (inventario == null)
            {
                return NotFound();
            }

            return inventario;
        }

        // PUT: api/Inventario/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventario(int id, Inventario inventario)
        {
            if (id != inventario.IdInventario)
            {
                return BadRequest();
            }

            _context.Entry(inventario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventarioExists(id))
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

        // POST: api/Inventario
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Inventario>> PostInventario(Inventario inventario)
        {
          if (_context.Inventarios == null)
          {
              return Problem("Entity set 'FacturacionContext.Inventarios'  is null.");
          }
            _context.Inventarios.Add(inventario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInventario", new { id = inventario.IdInventario }, inventario);
        }

        // DELETE: api/Inventario/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventario(int id)
        {
            if (_context.Inventarios == null)
            {
                return NotFound();
            }
            var inventario = await _context.Inventarios.FindAsync(id);
            if (inventario == null)
            {
                return NotFound();
            }

            _context.Inventarios.Remove(inventario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InventarioExists(int id)
        {
            return (_context.Inventarios?.Any(e => e.IdInventario == id)).GetValueOrDefault();
        }
    }
}
