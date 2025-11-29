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
    public class StudentPhonesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentPhonesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/StudentPhones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentPhone>>> GetStudentPhones()
        {
            return await _context.StudentPhones.ToListAsync();
        }

        // GET: api/StudentPhones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentPhone>> GetStudentPhone(int id)
        {
            var studentPhone = await _context.StudentPhones.FindAsync(id);

            if (studentPhone == null)
            {
                return NotFound();
            }

            return studentPhone;
        }

        // PUT: api/StudentPhones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentPhone(int id, StudentPhone studentPhone)
        {
            if (id != studentPhone.StuId)
            {
                return BadRequest();
            }

            _context.Entry(studentPhone).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentPhoneExists(id))
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

        // POST: api/StudentPhones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentPhone>> PostStudentPhone(StudentPhone studentPhone)
        {
            _context.StudentPhones.Add(studentPhone);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StudentPhoneExists(studentPhone.StuId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStudentPhone", new { id = studentPhone.StuId }, studentPhone);
        }

        // DELETE: api/StudentPhones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentPhone(int id)
        {
            var studentPhone = await _context.StudentPhones.FindAsync(id);
            if (studentPhone == null)
            {
                return NotFound();
            }

            _context.StudentPhones.Remove(studentPhone);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentPhoneExists(int id)
        {
            return _context.StudentPhones.Any(e => e.StuId == id);
        }
    }
}
