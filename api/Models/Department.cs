using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Departement", Schema = "Faculty")]
    public class Department
    {
        [Key]
        public int Dept_ID { get; set; }

        [Required]
        [StringLength(100)]
        public string Dept_Name { get; set; } = string.Empty;

        [Required]
        public int Doc_ID { get; set; }

        [Required]
        public DateTime Establish_Date { get; set; }

        [StringLength(50)]
        public string? Location { get; set; }

        [StringLength(200)]
        public string? Dept_Description { get; set; }

        [StringLength(20)]
        public string? Dept_Code { get; set; }

        // Navigation properties
        [ForeignKey("Doc_ID")]
        public virtual Doctor? HeadDoctor { get; set; }

        public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
        public virtual ICollection<Student> Students { get; set; } = new List<Student>();
        public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}

