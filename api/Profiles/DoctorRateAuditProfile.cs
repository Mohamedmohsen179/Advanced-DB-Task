using AutoMapper;
using api.Models;
using api.DTOs.DoctorRateAudits;

namespace api.Profiles
{
    public class DoctorRateAuditProfile : Profile
    {
        public DoctorRateAuditProfile()
        {
            CreateMap<DoctorRateAudit, DoctorRateAuditReadDto>();
            CreateMap<DoctorRateAuditCreateDto, DoctorRateAudit>();
            CreateMap<DoctorRateAuditUpdateDto, DoctorRateAudit>();
        }
    }
}

