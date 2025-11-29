using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.DoctorAddresses;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorAddressesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public DoctorAddressesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorAddressReadDto>>> Get()
        {
            var items = await _context.DoctorAddresses.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<DoctorAddressReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorAddressReadDto>> GetById(int id)
        {
            var item = await _context.DoctorAddresses.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<DoctorAddressReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<DoctorAddressReadDto>> Create(DoctorAddressCreateDto dto)
        {
            var item = _mapper.Map<DoctorAddress>(dto);
            _context.DoctorAddresses.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<DoctorAddressReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DoctorAddressUpdateDto dto)
        {
            var item = await _context.DoctorAddresses.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.DoctorAddresses.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.DoctorAddresses.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
