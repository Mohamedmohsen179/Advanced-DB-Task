namespace api.DTOs.Doctors
{
    public class DoctorUpdateDto
    {
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public DateOnly? HireDate { get; set; }
        public DateOnly? Dob { get; set; }
        public string? Gender { get; set; }
        public int? HourRate { get; set; }
        public int? HoursPerWeek { get; set; }
        public int? Salary { get; set; }
        public int DeptId { get; set; }
    }
}

