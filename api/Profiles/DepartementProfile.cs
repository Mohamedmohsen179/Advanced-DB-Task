using AutoMapper;
using api.Models;
using api.DTOs.Departements;

namespace api.Profiles
{
    public class DepartementProfile : Profile
    {
        public DepartementProfile()
        {
            CreateMap<Departement, DepartementReadDto>();
            CreateMap<DepartementCreateDto, Departement>();
            CreateMap<DepartementUpdateDto, Departement>();
        }
    }
}

