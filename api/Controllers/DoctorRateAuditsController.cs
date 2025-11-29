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
    public class DoctorRateAuditsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DoctorRateAuditsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DoctorRateAudits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorRateAudit>>> GetDoctorRateAudits()
        {
            return await _context.DoctorRateAudits.ToListAsync();
        }

        // GET: api/DoctorRateAudits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorRateAudit>> GetDoctorRateAudit(int id)
        {
            var doctorRateAudit = await _context.DoctorRateAudits.FindAsync(id);

            if (doctorRateAudit == null)
            {
                return NotFound();
            }

            return doctorRateAudit;
        }

        // PUT: api/DoctorRateAudits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctorRateAudit(int id, DoctorRateAudit doctorRateAudit)
        {
            if (id != doctorRateAudit.AuditId)
            {
                return BadRequest();
            }

            _context.Entry(doctorRateAudit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorRateAuditExists(id))
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

        // POST: api/DoctorRateAudits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DoctorRateAudit>> PostDoctorRateAudit(DoctorRateAudit doctorRateAudit)
        {
            _context.DoctorRateAudits.Add(doctorRateAudit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDoctorRateAudit", new { id = doctorRateAudit.AuditId }, doctorRateAudit);
        }

        // DELETE: api/DoctorRateAudits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctorRateAudit(int id)
        {
            var doctorRateAudit = await _context.DoctorRateAudits.FindAsync(id);
            if (doctorRateAudit == null)
            {
                return NotFound();
            }

            _context.DoctorRateAudits.Remove(doctorRateAudit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoctorRateAuditExists(int id)
        {
            return _context.DoctorRateAudits.Any(e => e.AuditId == id);
        }
    }
}
