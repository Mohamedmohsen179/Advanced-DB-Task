using AutoMapper;
using api.Models;
using api.DTOs.DoctorPhones;

namespace api.Profiles
{
    public class DoctorPhoneProfile : Profile
    {
        public DoctorPhoneProfile()
        {
            CreateMap<DoctorPhone, DoctorPhoneReadDto>();
            CreateMap<DoctorPhoneCreateDto, DoctorPhone>();
            CreateMap<DoctorPhoneUpdateDto, DoctorPhone>();
        }
    }
}

