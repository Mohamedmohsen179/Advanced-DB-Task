using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Doctor
{
    public int DocId { get; set; }

    public string Ssn { get; set; } = null!;

    public string Fname { get; set; } = null!;

    public string Lname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateOnly? HireDate { get; set; }

    public DateOnly? Dob { get; set; }

    public int? Age { get; set; }

    public string? Gender { get; set; }

    public int? HourRate { get; set; }

    public int? HoursPerWeek { get; set; }

    public int? Salary { get; set; }

    public int DeptId { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

    public virtual ICollection<Departement> Departements { get; set; } = new List<Departement>();

    public virtual Departement Dept { get; set; } = null!;

    public virtual ICollection<DoctorAddress> DoctorAddresses { get; set; } = new List<DoctorAddress>();

    public virtual ICollection<DoctorPhone> DoctorPhones { get; set; } = new List<DoctorPhone>();

    public virtual ICollection<Teach> Teaches { get; set; } = new List<Teach>();
}
