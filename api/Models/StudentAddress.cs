using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Student_Address", Schema = "Faculty")]
    public class StudentAddress
    {
        [Key, Column(Order = 0)]
        public int Stu_ID { get; set; }

        [Key, Column(Order = 1)]
        [Required]
        [StringLength(50)]
        public string City { get; set; } = string.Empty;

        [Key, Column(Order = 2)]
        [Required]
        [StringLength(50)]
        public string Street { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("Stu_ID")]
        public virtual Student? Student { get; set; }
    }
}

