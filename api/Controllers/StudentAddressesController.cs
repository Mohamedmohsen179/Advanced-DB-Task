using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.StudentAddresses;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAddressesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public StudentAddressesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentAddressReadDto>>> Get()
        {
            var items = await _context.StudentAddresses.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<StudentAddressReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentAddressReadDto>> GetById(int id)
        {
            var item = await _context.StudentAddresses.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<StudentAddressReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<StudentAddressReadDto>> Create(StudentAddressCreateDto dto)
        {
            var item = _mapper.Map<StudentAddress>(dto);
            _context.StudentAddresses.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<StudentAddressReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, StudentAddressUpdateDto dto)
        {
            var item = await _context.StudentAddresses.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.StudentAddresses.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.StudentAddresses.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
