using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly FacultyDbContext _context;

        public CoursesController(FacultyDbContext context)
        {
            _context = context;
        }

        // GET: api/Courses
        [HttpGet]
        public async Task<ActionResult<object>> GetCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Department)
                .Include(c => c.Instructor)
                .Include(c => c.Schedules)
                .Select(c => new
                {
                    c.Crs_ID,
                    c.Crs_Name,
                    c.Discription,
                    c.Credit_Hours,
                    c.Doc_ID,
                    c.Dept_ID,
                    c.Max_Num_Stu,
                    schedules = c.Schedules,
                    instructor = c.Instructor != null ? new
                    {
                        c.Instructor.Doc_ID,
                        c.Instructor.FName,
                        c.Instructor.LName,
                        c.Instructor.Email
                    } : null,
                    department = c.Department != null ? new
                    {
                        c.Department.Dept_ID,
                        c.Department.Dept_Name,
                        c.Department.Dept_Code
                    } : null
                })
                .ToListAsync();

            return Ok(new
            {
                data = courses,
                pagination = new
                {
                    page = 1,
                    limit = 100,
                    total = courses.Count,
                    totalPages = 1
                },
                success = true
            });
        }

        // GET: api/Courses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetCourse(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Department)
                .Include(c => c.Instructor)
                .Include(c => c.Schedules)
                .Where(c => c.Crs_ID == id)
                .Select(c => new
                {
                    c.Crs_ID,
                    c.Crs_Name,
                    c.Discription,
                    c.Credit_Hours,
                    c.Doc_ID,
                    c.Dept_ID,
                    c.Max_Num_Stu,
                    schedules = c.Schedules,
                    instructor = c.Instructor != null ? new
                    {
                        c.Instructor.Doc_ID,
                        c.Instructor.FName,
                        c.Instructor.LName,
                        c.Instructor.Email
                    } : null,
                    department = c.Department != null ? new
                    {
                        c.Department.Dept_ID,
                        c.Department.Dept_Name,
                        c.Department.Dept_Code
                    } : null
                })
                .FirstOrDefaultAsync();

            if (course == null)
            {
                return NotFound(new { success = false, message = "Course not found" });
            }

            return Ok(new { data = course, success = true });
        }

        // POST: api/Courses
        [HttpPost]
        public async Task<ActionResult<object>> PostCourse(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourse), new { id = course.Crs_ID }, new { data = course, success = true });
        }

        // PUT: api/Courses/5
        [HttpPut("{id}")]
        public async Task<ActionResult<object>> PutCourse(int id, Course course)
        {
            if (id != course.Crs_ID)
            {
                return BadRequest(new { success = false, message = "Course ID mismatch" });
            }

            _context.Entry(course).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound(new { success = false, message = "Course not found" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { data = course, success = true });
        }

        // DELETE: api/Courses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<object>> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound(new { success = false, message = "Course not found" });
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return Ok(new { data = (object?)null, success = true });
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.Crs_ID == id);
        }
    }
}

