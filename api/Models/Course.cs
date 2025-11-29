using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Course", Schema = "Faculty")]
    public class Course
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Crs_ID { get; set; }

        [Required]
        [StringLength(50)]
        public string Crs_Name { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string Discription { get; set; } = string.Empty;

        [Required]
        public int Credit_Hours { get; set; }

        [Required]
        public int Doc_ID { get; set; }

        [Required]
        public int Dept_ID { get; set; }

        public int? Max_Num_Stu { get; set; }

        // Navigation properties
        [ForeignKey("Doc_ID")]
        public virtual Doctor? Instructor { get; set; }

        [ForeignKey("Dept_ID")]
        public virtual Department? Department { get; set; }

        public virtual ICollection<CourseSchedule> Schedules { get; set; } = new List<CourseSchedule>();
        public virtual ICollection<Enrollement> Enrollments { get; set; } = new List<Enrollement>();
        public virtual ICollection<Teach> TeachingAssignments { get; set; } = new List<Teach>();
    }
}

