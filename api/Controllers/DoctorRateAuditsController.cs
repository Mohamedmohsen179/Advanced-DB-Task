using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.DoctorRateAudits;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorRateAuditsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public DoctorRateAuditsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorRateAuditReadDto>>> Get()
        {
            var items = await _context.DoctorRateAudits.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<DoctorRateAuditReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorRateAuditReadDto>> GetById(int id)
        {
            var item = await _context.DoctorRateAudits.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<DoctorRateAuditReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<DoctorRateAuditReadDto>> Create(DoctorRateAuditCreateDto dto)
        {
            var item = _mapper.Map<DoctorRateAudit>(dto);
            _context.DoctorRateAudits.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<DoctorRateAuditReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DoctorRateAuditUpdateDto dto)
        {
            var item = await _context.DoctorRateAudits.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.DoctorRateAudits.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.DoctorRateAudits.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
