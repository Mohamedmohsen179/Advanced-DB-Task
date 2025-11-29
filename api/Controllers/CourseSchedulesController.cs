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
    public class CourseSchedulesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseSchedulesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CourseSchedules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseSchedule>>> GetCourseSchedules()
        {
            return await _context.CourseSchedules.ToListAsync();
        }

        // GET: api/CourseSchedules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseSchedule>> GetCourseSchedule(int id)
        {
            var courseSchedule = await _context.CourseSchedules.FindAsync(id);

            if (courseSchedule == null)
            {
                return NotFound();
            }

            return courseSchedule;
        }

        // PUT: api/CourseSchedules/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourseSchedule(int id, CourseSchedule courseSchedule)
        {
            if (id != courseSchedule.SchId)
            {
                return BadRequest();
            }

            _context.Entry(courseSchedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseScheduleExists(id))
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

        // POST: api/CourseSchedules
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CourseSchedule>> PostCourseSchedule(CourseSchedule courseSchedule)
        {
            _context.CourseSchedules.Add(courseSchedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourseSchedule", new { id = courseSchedule.SchId }, courseSchedule);
        }

        // DELETE: api/CourseSchedules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourseSchedule(int id)
        {
            var courseSchedule = await _context.CourseSchedules.FindAsync(id);
            if (courseSchedule == null)
            {
                return NotFound();
            }

            _context.CourseSchedules.Remove(courseSchedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseScheduleExists(int id)
        {
            return _context.CourseSchedules.Any(e => e.SchId == id);
        }
    }
}
