using AutoMapper;
using api.Models;
using api.DTOs.StudentAddresses;

namespace api.Profiles
{
    public class StudentAddressProfile : Profile
    {
        public StudentAddressProfile()
        {
            CreateMap<StudentAddress, StudentAddressReadDto>();
            CreateMap<StudentAddressCreateDto, StudentAddress>();
            CreateMap<StudentAddressUpdateDto, StudentAddress>();
        }
    }
}

