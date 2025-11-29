using System;
using System.Collections.Generic;

namespace api.Models;

public partial class StudentDetailsView
{
    public int StuId { get; set; }

    public string FullName { get; set; } = null!;

    public string DeptName { get; set; } = null!;

    public int? Level { get; set; }

    public string? PrimaryPhone { get; set; }
}
