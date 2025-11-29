using AutoMapper;
using api.Models;
using api.DTOs.Teaches;

namespace api.Profiles
{
    public class TeachProfile : Profile
    {
        public TeachProfile()
        {
            CreateMap<Teach, TeachReadDto>();
            CreateMap<TeachCreateDto, Teach>();
            CreateMap<TeachUpdateDto, Teach>();
        }
    }
}

