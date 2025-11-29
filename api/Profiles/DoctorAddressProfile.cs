using AutoMapper;
using api.Models;
using api.DTOs.DoctorAddresses;

namespace api.Profiles
{
    public class DoctorAddressProfile : Profile
    {
        public DoctorAddressProfile()
        {
            CreateMap<DoctorAddress, DoctorAddressReadDto>();
            CreateMap<DoctorAddressCreateDto, DoctorAddress>();
            CreateMap<DoctorAddressUpdateDto, DoctorAddress>();
        }
    }
}

