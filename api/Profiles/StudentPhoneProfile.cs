using AutoMapper;
using api.Models;
using api.DTOs.StudentPhones;

namespace api.Profiles
{
    public class StudentPhoneProfile : Profile
    {
        public StudentPhoneProfile()
        {
            CreateMap<StudentPhone, StudentPhoneReadDto>();
            CreateMap<StudentPhoneCreateDto, StudentPhone>();
            CreateMap<StudentPhoneUpdateDto, StudentPhone>();
        }
    }
}

