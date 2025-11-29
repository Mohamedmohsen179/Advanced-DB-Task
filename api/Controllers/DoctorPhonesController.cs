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
    public class DoctorPhonesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DoctorPhonesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DoctorPhones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorPhone>>> GetDoctorPhones()
        {
            return await _context.DoctorPhones.ToListAsync();
        }

        // GET: api/DoctorPhones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorPhone>> GetDoctorPhone(int id)
        {
            var doctorPhone = await _context.DoctorPhones.FindAsync(id);

            if (doctorPhone == null)
            {
                return NotFound();
            }

            return doctorPhone;
        }

        // PUT: api/DoctorPhones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctorPhone(int id, DoctorPhone doctorPhone)
        {
            if (id != doctorPhone.DocId)
            {
                return BadRequest();
            }

            _context.Entry(doctorPhone).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorPhoneExists(id))
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

        // POST: api/DoctorPhones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DoctorPhone>> PostDoctorPhone(DoctorPhone doctorPhone)
        {
            _context.DoctorPhones.Add(doctorPhone);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DoctorPhoneExists(doctorPhone.DocId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDoctorPhone", new { id = doctorPhone.DocId }, doctorPhone);
        }

        // DELETE: api/DoctorPhones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctorPhone(int id)
        {
            var doctorPhone = await _context.DoctorPhones.FindAsync(id);
            if (doctorPhone == null)
            {
                return NotFound();
            }

            _context.DoctorPhones.Remove(doctorPhone);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoctorPhoneExists(int id)
        {
            return _context.DoctorPhones.Any(e => e.DocId == id);
        }
    }
}
