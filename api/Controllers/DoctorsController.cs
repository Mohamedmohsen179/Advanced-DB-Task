using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.Doctors;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public DoctorsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorReadDto>>> Get()
        {
            var items = await _context.Doctors.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<DoctorReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorReadDto>> GetById(int id)
        {
            var item = await _context.Doctors.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<DoctorReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<DoctorReadDto>> Create(DoctorCreateDto dto)
        {
            var item = _mapper.Map<Doctor>(dto);
            _context.Doctors.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<DoctorReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DoctorUpdateDto dto)
        {
            var item = await _context.Doctors.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Doctors.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.Doctors.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
