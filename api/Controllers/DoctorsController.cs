using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly FacultyDbContext _context;

        public DoctorsController(FacultyDbContext context)
        {
            _context = context;
        }

        // GET: api/Doctors
        [HttpGet]
        public async Task<ActionResult<object>> GetDoctors()
        {
            var doctors = await _context.Doctors
                .Include(d => d.Department)
                .Include(d => d.Phones)
                .Include(d => d.Addresses)
                .ToListAsync();

            return Ok(new
            {
                data = doctors,
                pagination = new
                {
                    page = 1,
                    limit = 100,
                    total = doctors.Count,
                    totalPages = 1
                },
                success = true
            });
        }

        // GET: api/Doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetDoctor(int id)
        {
            var doctor = await _context.Doctors
                .Include(d => d.Department)
                .Include(d => d.Phones)
                .Include(d => d.Addresses)
                .Include(d => d.Courses)
                .FirstOrDefaultAsync(d => d.Doc_ID == id);

            if (doctor == null)
            {
                return NotFound(new { success = false, message = "Doctor not found" });
            }

            return Ok(new { data = doctor, success = true });
        }

        // POST: api/Doctors
        [HttpPost]
        public async Task<ActionResult<object>> PostDoctor(Doctor doctor)
        {
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDoctor), new { id = doctor.Doc_ID }, new { data = doctor, success = true });
        }

        // PUT: api/Doctors/5
        [HttpPut("{id}")]
        public async Task<ActionResult<object>> PutDoctor(int id, Doctor doctor)
        {
            if (id != doctor.Doc_ID)
            {
                return BadRequest(new { success = false, message = "Doctor ID mismatch" });
            }

            _context.Entry(doctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorExists(id))
                {
                    return NotFound(new { success = false, message = "Doctor not found" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { data = doctor, success = true });
        }

        // DELETE: api/Doctors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<object>> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound(new { success = false, message = "Doctor not found" });
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return Ok(new { data = (object?)null, success = true });
        }

        private bool DoctorExists(int id)
        {
            return _context.Doctors.Any(e => e.Doc_ID == id);
        }
    }
}

