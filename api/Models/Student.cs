using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Student", Schema = "Faculty")]
    public class Student
    {
        [Key]
        public int Stu_ID { get; set; }

        [Required]
        [StringLength(14)]
        public string Stu_SSN { get; set; } = string.Empty;

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
        [StringLength(255)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [StringLength(1)]
        public string Gender { get; set; } = string.Empty;

        [Required]
        [Range(1, 4)]
        public int Level { get; set; }

        public DateTime DOB { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int? Age { get; set; }

        [Required]
        [Column(TypeName = "decimal(3,2)")]
        public decimal CGPA { get; set; }

        [Required]
        public int Dept_ID { get; set; }

        // Navigation properties
        [ForeignKey("Dept_ID")]
        public virtual Department? Department { get; set; }

        public virtual ICollection<StudentPhone> Phones { get; set; } = new List<StudentPhone>();
        public virtual ICollection<StudentAddress> Addresses { get; set; } = new List<StudentAddress>();
        public virtual ICollection<Enrollement> Enrollments { get; set; } = new List<Enrollement>();
    }
}

