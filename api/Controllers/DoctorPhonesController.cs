using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.DoctorPhones;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorPhonesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public DoctorPhonesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorPhoneReadDto>>> Get()
        {
            var items = await _context.DoctorPhones.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<DoctorPhoneReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorPhoneReadDto>> GetById(int id)
        {
            var item = await _context.DoctorPhones.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<DoctorPhoneReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<DoctorPhoneReadDto>> Create(DoctorPhoneCreateDto dto)
        {
            var item = _mapper.Map<DoctorPhone>(dto);
            _context.DoctorPhones.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<DoctorPhoneReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DoctorPhoneUpdateDto dto)
        {
            var item = await _context.DoctorPhones.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.DoctorPhones.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.DoctorPhones.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
