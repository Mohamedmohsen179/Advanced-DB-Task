using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Doctor", Schema = "Faculty")]
    public class Doctor
    {
        [Key]
        public int Doc_ID { get; set; }

        [Required]
        [StringLength(14)]
        public string SSN { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string FName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [StringLength(10)]
        public string Password { get; set; } = string.Empty;

        public DateTime Hire_Date { get; set; }

        public DateTime DOB { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int? Age { get; set; }

        [Required]
        [StringLength(1)]
        public string Gender { get; set; } = string.Empty;

        [Required]
        public int Hour_Rate { get; set; }

        [Required]
        public int Hours_Per_Week { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int? Salary { get; set; }

        [Required]
        public int Dept_ID { get; set; }

        // Navigation properties
        [ForeignKey("Dept_ID")]
        public virtual Department? Department { get; set; }

        public virtual ICollection<DoctorPhone> Phones { get; set; } = new List<DoctorPhone>();
        public virtual ICollection<DoctorAddress> Addresses { get; set; } = new List<DoctorAddress>();
        public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
        public virtual ICollection<Teach> TeachingAssignments { get; set; } = new List<Teach>();
    }
}

