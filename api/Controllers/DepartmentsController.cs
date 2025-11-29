using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly FacultyDbContext _context;

        public DepartmentsController(FacultyDbContext context)
        {
            _context = context;
        }

        // GET: api/Departments
        [HttpGet]
        public async Task<ActionResult<object>> GetDepartments()
        {
            var departments = await _context.Departments
                .Include(d => d.HeadDoctor)
                .ToListAsync();

            return Ok(new
            {
                data = departments,
                pagination = new
                {
                    page = 1,
                    limit = 100,
                    total = departments.Count,
                    totalPages = 1
                },
                success = true
            });
        }

        // GET: api/Departments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetDepartment(int id)
        {
            var department = await _context.Departments
                .Include(d => d.HeadDoctor)
                .FirstOrDefaultAsync(d => d.Dept_ID == id);

            if (department == null)
            {
                return NotFound(new { success = false, message = "Department not found" });
            }

            return Ok(new { data = department, success = true });
        }

        // POST: api/Departments
        [HttpPost]
        public async Task<ActionResult<object>> PostDepartment(Department department)
        {
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDepartment), new { id = department.Dept_ID }, new { data = department, success = true });
        }

        // PUT: api/Departments/5
        [HttpPut("{id}")]
        public async Task<ActionResult<object>> PutDepartment(int id, Department department)
        {
            if (id != department.Dept_ID)
            {
                return BadRequest(new { success = false, message = "Department ID mismatch" });
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound(new { success = false, message = "Department not found" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { data = department, success = true });
        }

        // DELETE: api/Departments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<object>> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound(new { success = false, message = "Department not found" });
            }

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();

            return Ok(new { data = (object?)null, success = true });
        }

        private bool DepartmentExists(int id)
        {
            return _context.Departments.Any(e => e.Dept_ID == id);
        }
    }
}

