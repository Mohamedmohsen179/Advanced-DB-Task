using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.Students;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public StudentsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentReadDto>>> Get()
        {
            var items = await _context.Students.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<StudentReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentReadDto>> GetById(int id)
        {
            var item = await _context.Students.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<StudentReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<StudentReadDto>> Create(StudentCreateDto dto)
        {
            var item = _mapper.Map<Student>(dto);
            _context.Students.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<StudentReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, StudentUpdateDto dto)
        {
            var item = await _context.Students.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Students.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.Students.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
