using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Departement
{
    public int DeptId { get; set; }

    public string DeptName { get; set; } = null!;

    public int? DocId { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

    public virtual Doctor? Doc { get; set; }

    public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
}
