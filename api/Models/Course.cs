using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Course
{
    public int CrsId { get; set; }

    public string CrsName { get; set; } = null!;

    public string Discription { get; set; } = null!;

    public int CreditHours { get; set; }

    public int DocId { get; set; }

    public int DeptId { get; set; }

    public virtual ICollection<CourseSchedule> CourseSchedules { get; set; } = new List<CourseSchedule>();

    public virtual Departement Dept { get; set; } = null!;

    public virtual Doctor Doc { get; set; } = null!;

    public virtual ICollection<Enrollement> Enrollements { get; set; } = new List<Enrollement>();

    public virtual ICollection<Teach> Teaches { get; set; } = new List<Teach>();
}
