namespace api.DTOs.Courses
{
    public class CourseCreateDto
    {
        public string CrsName { get; set; }
        public string Discription { get; set; }
        public int CreditHours { get; set; }
        public int DocId { get; set; }
        public int DeptId { get; set; }
    }
}

