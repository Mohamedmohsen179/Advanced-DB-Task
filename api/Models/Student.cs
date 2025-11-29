using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Student
{
    public int StuId { get; set; }

    public string StuSsn { get; set; } = null!;

    public string Fname { get; set; } = null!;

    public string Lname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Gender { get; set; }

    public int? Level { get; set; }

    public DateOnly? Dob { get; set; }

    public int? Age { get; set; }

    public decimal? Cgpa { get; set; }

    public int DeptId { get; set; }

    public virtual Departement Dept { get; set; } = null!;

    public virtual ICollection<Enrollement> Enrollements { get; set; } = new List<Enrollement>();

    public virtual ICollection<StudentAddress> StudentAddresses { get; set; } = new List<StudentAddress>();

    public virtual ICollection<StudentPhone> StudentPhones { get; set; } = new List<StudentPhone>();
}
