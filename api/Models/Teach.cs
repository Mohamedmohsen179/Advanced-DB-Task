using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Teach", Schema = "Faculty")]
    public class Teach
    {
        [Key, Column(Order = 0)]
        public int Crs_ID { get; set; }

        [Key, Column(Order = 1)]
        public int Doc_ID { get; set; }

        [Key, Column(Order = 2)]
        [Required]
        [StringLength(50)]
        public string Semester { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("Crs_ID")]
        public virtual Course? Course { get; set; }

        [ForeignKey("Doc_ID")]
        public virtual Doctor? Doctor { get; set; }
    }
}

