using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Course_Schedule", Schema = "Faculty")]
    public class CourseSchedule
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Sch_ID { get; set; }

        [Key, Column(Order = 1)]
        public int Crs_ID { get; set; }

        [Required]
        [StringLength(15)]
        public string Day { get; set; } = string.Empty;

        [Required]
        public TimeSpan Start_Hour { get; set; }

        [Required]
        public TimeSpan END_Hour { get; set; }

        [Range(1, 4)]
        public int? Level { get; set; }

        [StringLength(100)]
        public string? Location { get; set; }

        // Navigation properties
        [ForeignKey("Crs_ID")]
        public virtual Course? Course { get; set; }
    }
}

