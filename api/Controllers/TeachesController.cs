using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.Teaches;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TeachesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeachReadDto>>> Get()
        {
            var items = await _context.Teaches.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<TeachReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeachReadDto>> GetById(int id)
        {
            var item = await _context.Teaches.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<TeachReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<TeachReadDto>> Create(TeachCreateDto dto)
        {
            var item = _mapper.Map<Teach>(dto);
            _context.Teaches.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<TeachReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TeachUpdateDto dto)
        {
            var item = await _context.Teaches.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Teaches.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.Teaches.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
