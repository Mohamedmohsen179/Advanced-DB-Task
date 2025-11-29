using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Student_Phone", Schema = "Faculty")]
    public class StudentPhone
    {
        [Key, Column(Order = 0)]
        public int Stu_ID { get; set; }

        [Key, Column(Order = 1)]
        [Required]
        [StringLength(20)]
        public string Phone_NUM { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("Stu_ID")]
        public virtual Student? Student { get; set; }
    }
}

