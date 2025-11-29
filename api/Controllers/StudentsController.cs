using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly FacultyDbContext _context;

        public StudentsController(FacultyDbContext context)
        {
            _context = context;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<object>> GetStudents()
        {
            var students = await _context.Students
                .Include(s => s.Department)
                .Include(s => s.Phones)
                .Include(s => s.Addresses)
                .Include(s => s.Enrollments)
                .ToListAsync();

            return Ok(new
            {
                data = students,
                pagination = new
                {
                    page = 1,
                    limit = 100,
                    total = students.Count,
                    totalPages = 1
                },
                success = true
            });
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetStudent(int id)
        {
            var student = await _context.Students
                .Include(s => s.Department)
                .Include(s => s.Phones)
                .Include(s => s.Addresses)
                .Include(s => s.Enrollments)
                .FirstOrDefaultAsync(s => s.Stu_ID == id);

            if (student == null)
            {
                return NotFound(new { success = false, message = "Student not found" });
            }

            return Ok(new { data = student, success = true });
        }

        // GET: api/Students/5/courses
        [HttpGet("{id}/courses")]
        public async Task<ActionResult<object>> GetStudentCourses(int id)
        {
            var enrollments = await _context.Enrollements
                .Where(e => e.Stu_ID == id)
                .Include(e => e.Course)
                    .ThenInclude(c => c.Instructor)
                .Include(e => e.Course)
                    .ThenInclude(c => c.Department)
                .Include(e => e.Course)
                    .ThenInclude(c => c.Schedules)
                .ToListAsync();

            var courses = enrollments.Select(e => new
            {
                e.Course.Crs_ID,
                e.Course.Crs_Name,
                e.Course.Discription,
                e.Course.Credit_Hours,
                e.Course.Doc_ID,
                e.Course.Dept_ID,
                e.Course.Max_Num_Stu,
                schedules = e.Course.Schedules,
                instructor = e.Course.Instructor != null ? new
                {
                    e.Course.Instructor.Doc_ID,
                    e.Course.Instructor.FName,
                    e.Course.Instructor.LName,
                    e.Course.Instructor.Email
                } : null,
                department = e.Course.Department != null ? new
                {
                    e.Course.Department.Dept_ID,
                    e.Course.Department.Dept_Name,
                    e.Course.Department.Dept_Code
                } : null,
                enrollment = new
                {
                    e.Grade,
                    e.Year
                }
            }).ToList();

            return Ok(new { data = courses, success = true });
        }

        // POST: api/Students
        [HttpPost]
        public async Task<ActionResult<object>> PostStudent(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudent), new { id = student.Stu_ID }, new { data = student, success = true });
        }

        // PUT: api/Students/5
        [HttpPut("{id}")]
        public async Task<ActionResult<object>> PutStudent(int id, Student student)
        {
            if (id != student.Stu_ID)
            {
                return BadRequest(new { success = false, message = "Student ID mismatch" });
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound(new { success = false, message = "Student not found" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { data = student, success = true });
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<object>> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound(new { success = false, message = "Student not found" });
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Ok(new { data = (object?)null, success = true });
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.Stu_ID == id);
        }
    }
}

