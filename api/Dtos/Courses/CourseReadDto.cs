namespace api.DTOs.Courses
{
    public class CourseReadDto
    {
        public int CrsId { get; set; }
        public string CrsName { get; set; }
        public string Discription { get; set; }
        public int CreditHours { get; set; }
        public int DocId { get; set; }
        public int DeptId { get; set; }
    }
}

