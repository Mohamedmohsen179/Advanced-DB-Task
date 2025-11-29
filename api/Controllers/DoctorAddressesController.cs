using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorAddressesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DoctorAddressesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DoctorAddresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorAddress>>> GetDoctorAddresses()
        {
            return await _context.DoctorAddresses.ToListAsync();
        }

        // GET: api/DoctorAddresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorAddress>> GetDoctorAddress(int id)
        {
            var doctorAddress = await _context.DoctorAddresses.FindAsync(id);

            if (doctorAddress == null)
            {
                return NotFound();
            }

            return doctorAddress;
        }

        // PUT: api/DoctorAddresses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctorAddress(int id, DoctorAddress doctorAddress)
        {
            if (id != doctorAddress.DocId)
            {
                return BadRequest();
            }

            _context.Entry(doctorAddress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorAddressExists(id))
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

        // POST: api/DoctorAddresses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DoctorAddress>> PostDoctorAddress(DoctorAddress doctorAddress)
        {
            _context.DoctorAddresses.Add(doctorAddress);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DoctorAddressExists(doctorAddress.DocId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDoctorAddress", new { id = doctorAddress.DocId }, doctorAddress);
        }

        // DELETE: api/DoctorAddresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctorAddress(int id)
        {
            var doctorAddress = await _context.DoctorAddresses.FindAsync(id);
            if (doctorAddress == null)
            {
                return NotFound();
            }

            _context.DoctorAddresses.Remove(doctorAddress);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoctorAddressExists(int id)
        {
            return _context.DoctorAddresses.Any(e => e.DocId == id);
        }
    }
}
