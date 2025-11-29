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
    public class EnrollementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EnrollementsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Enrollements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enrollement>>> GetEnrollements()
        {
            return await _context.Enrollements.ToListAsync();
        }

        // GET: api/Enrollements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Enrollement>> GetEnrollement(int id)
        {
            var enrollement = await _context.Enrollements.FindAsync(id);

            if (enrollement == null)
            {
                return NotFound();
            }

            return enrollement;
        }

        // PUT: api/Enrollements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnrollement(int id, Enrollement enrollement)
        {
            if (id != enrollement.StuId)
            {
                return BadRequest();
            }

            _context.Entry(enrollement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnrollementExists(id))
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

        // POST: api/Enrollements
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Enrollement>> PostEnrollement(Enrollement enrollement)
        {
            _context.Enrollements.Add(enrollement);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EnrollementExists(enrollement.StuId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEnrollement", new { id = enrollement.StuId }, enrollement);
        }

        // DELETE: api/Enrollements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnrollement(int id)
        {
            var enrollement = await _context.Enrollements.FindAsync(id);
            if (enrollement == null)
            {
                return NotFound();
            }

            _context.Enrollements.Remove(enrollement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EnrollementExists(int id)
        {
            return _context.Enrollements.Any(e => e.StuId == id);
        }
    }
}
