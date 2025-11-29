namespace api.DTOs.Students
{
    public class StudentUpdateDto
    {
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Level { get; set; }
        public double Cgpa { get; set; }
        public int DeptId { get; set; }
    }
}
