using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Doctor_Phone", Schema = "Faculty")]
    public class DoctorPhone
    {
        [Key, Column(Order = 0)]
        public int Doc_ID { get; set; }

        [Key, Column(Order = 1)]
        [Required]
        [StringLength(20)]
        public string Phone_NUM { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("Doc_ID")]
        public virtual Doctor? Doctor { get; set; }
    }
}

