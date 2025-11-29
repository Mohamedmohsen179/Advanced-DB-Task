using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.Courses;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CoursesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseReadDto>>> Get()
        {
            var items = await _context.Courses.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<CourseReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseReadDto>> GetById(int id)
        {
            var item = await _context.Courses.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<CourseReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<CourseReadDto>> Create(CourseCreateDto dto)
        {
            var item = _mapper.Map<Course>(dto);
            _context.Courses.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<CourseReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CourseUpdateDto dto)
        {
            var item = await _context.Courses.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Courses.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.Courses.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
