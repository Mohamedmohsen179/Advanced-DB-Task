using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTOs.CourseSchedules;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseSchedulesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CourseSchedulesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseScheduleReadDto>>> Get()
        {
            var items = await _context.CourseSchedules.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<CourseScheduleReadDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseScheduleReadDto>> GetById(int id)
        {
            var item = await _context.CourseSchedules.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(_mapper.Map<CourseScheduleReadDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<CourseScheduleReadDto>> Create(CourseScheduleCreateDto dto)
        {
            var item = _mapper.Map<CourseSchedule>(dto);
            _context.CourseSchedules.Add(item);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<CourseScheduleReadDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CourseScheduleUpdateDto dto)
        {
            var item = await _context.CourseSchedules.FindAsync(id);
            if (item == null)
                return NotFound();

            _mapper.Map(dto, item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.CourseSchedules.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.CourseSchedules.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
