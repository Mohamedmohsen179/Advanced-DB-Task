namespace api.DTOs.Students
{
    public class StudentCreateDto
    {
        public string StuSsn { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public int Level { get; set; }
        public DateOnly Dob { get; set; }
        public int DeptId { get; set; }
    }
}
