using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.Departements;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public DepartementsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartementReadDto>>> Get()
        {
            var items = await _context.Departements.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<DepartementReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DepartementReadDto>> GetById(int id)
        {
            var item = await _context.Departements.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<DepartementReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<DepartementReadDto>> Create(DepartementCreateDto dto)
        {
            var item = _mapper.Map<Departement>(dto);
            _context.Departements.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<DepartementReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DepartementUpdateDto dto)
        {
            var item = await _context.Departements.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Departements.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.Departements.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
