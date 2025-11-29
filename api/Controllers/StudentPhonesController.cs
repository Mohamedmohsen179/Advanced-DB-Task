using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.StudentPhones;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentPhonesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public StudentPhonesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentPhoneReadDto>>> Get()
        {
            var items = await _context.StudentPhones.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<StudentPhoneReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentPhoneReadDto>> GetById(int id)
        {
            var item = await _context.StudentPhones.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<StudentPhoneReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<StudentPhoneReadDto>> Create(StudentPhoneCreateDto dto)
        {
            var item = _mapper.Map<StudentPhone>(dto);
            _context.StudentPhones.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<StudentPhoneReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, StudentPhoneUpdateDto dto)
        {
            var item = await _context.StudentPhones.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.StudentPhones.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.StudentPhones.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
