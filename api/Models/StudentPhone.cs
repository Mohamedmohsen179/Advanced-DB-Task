using System;
using System.Collections.Generic;

namespace api.Models;

public partial class StudentPhone
{
    public int StuId { get; set; }

    public string PhoneNum { get; set; } = null!;

    public virtual Student Stu { get; set; } = null!;
}
