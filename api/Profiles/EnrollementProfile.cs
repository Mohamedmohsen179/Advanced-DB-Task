using AutoMapper;
using api.Models;
using api.DTOs.Enrollements;

namespace api.Profiles
{
    public class EnrollementProfile : Profile
    {
        public EnrollementProfile()
        {
            CreateMap<Enrollement, EnrollementReadDto>();
            CreateMap<EnrollementCreateDto, Enrollement>();
            CreateMap<EnrollementUpdateDto, Enrollement>();
        }
    }
}

