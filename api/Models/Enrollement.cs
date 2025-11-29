using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Enrollement", Schema = "Faculty")]
    public class Enrollement
    {
        [Key, Column(Order = 0)]
        public int Stu_ID { get; set; }

        [Key, Column(Order = 1)]
        public int Crs_ID { get; set; }

        [Key, Column(Order = 2)]
        [StringLength(7)]
        public string Year { get; set; } = string.Empty;

        [Range(0, 100)]
        public int? Grade { get; set; }

        // Navigation properties
        [ForeignKey("Stu_ID")]
        public virtual Student? Student { get; set; }

        [ForeignKey("Crs_ID")]
        public virtual Course? Course { get; set; }
    }
}

