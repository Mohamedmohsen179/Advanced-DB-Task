using System;
using System.Collections.Generic;

namespace api.Models;

public partial class PublicDoctorInfoView
{
    public int DocId { get; set; }

    public string Fname { get; set; } = null!;

    public string Lname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateOnly? HireDate { get; set; }

    public string DeptName { get; set; } = null!;
}
