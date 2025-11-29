using AutoMapper;
using api.Models;
using api.DTOs.CourseSchedules;

namespace api.Profiles
{
    public class CourseScheduleProfile : Profile
    {
        public CourseScheduleProfile()
        {
            CreateMap<CourseSchedule, CourseScheduleReadDto>();
            CreateMap<CourseScheduleCreateDto, CourseSchedule>();
            CreateMap<CourseScheduleUpdateDto, CourseSchedule>();
        }
    }
}

