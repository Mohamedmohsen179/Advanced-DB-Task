namespace api.DTOs.Enrollements
{
    public class EnrollementReadDto
    {
        public int StuId { get; set; }
        public int CrsId { get; set; }
        public int? Grade { get; set; }
        public string Year { get; set; }
    }
}

