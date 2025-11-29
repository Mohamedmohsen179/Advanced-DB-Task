using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Doctor_Address", Schema = "Faculty")]
    public class DoctorAddress
    {
        [Key, Column(Order = 0)]
        public int Doc_ID { get; set; }

        [Key, Column(Order = 1)]
        [Required]
        [StringLength(50)]
        public string City { get; set; } = string.Empty;

        [Key, Column(Order = 2)]
        [Required]
        [StringLength(50)]
        public string Street { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("Doc_ID")]
        public virtual Doctor? Doctor { get; set; }
    }
}

