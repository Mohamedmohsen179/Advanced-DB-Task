namespace api.DTOs.DoctorRateAudits
{
    public class DoctorRateAuditUpdateDto
    {
        public int? OldRate { get; set; }
        public int? NewRate { get; set; }
        public DateTime? ChangeDate { get; set; }
        public string? ChangedBy { get; set; }
    }
}

