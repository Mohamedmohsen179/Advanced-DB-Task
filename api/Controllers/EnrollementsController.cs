using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.Enrollements;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public EnrollementsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EnrollementReadDto>>> Get()
        {
            var items = await _context.Enrollements.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<EnrollementReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EnrollementReadDto>> GetById(int id)
        {
            var item = await _context.Enrollements.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<EnrollementReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<EnrollementReadDto>> Create(EnrollementCreateDto dto)
        {
            var item = _mapper.Map<Enrollement>(dto);
            _context.Enrollements.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<EnrollementReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EnrollementUpdateDto dto)
        {
            var item = await _context.Enrollements.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Enrollements.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.Enrollements.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
