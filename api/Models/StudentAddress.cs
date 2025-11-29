using System;
using System.Collections.Generic;

namespace api.Models;

public partial class StudentAddress
{
    public int StuId { get; set; }

    public string City { get; set; } = null!;

    public string Street { get; set; } = null!;

    public virtual Student Stu { get; set; } = null!;
}
