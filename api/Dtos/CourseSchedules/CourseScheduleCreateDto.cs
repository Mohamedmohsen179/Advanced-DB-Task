namespace api.DTOs.CourseSchedules
{
    public class CourseScheduleCreateDto
    {
        public int CrsId { get; set; }
        public string Day { get; set; }
        public TimeOnly StartHour { get; set; }
        public TimeOnly EndHour { get; set; }
        public int? Level { get; set; }
        public string? Location { get; set; }
    }
}

