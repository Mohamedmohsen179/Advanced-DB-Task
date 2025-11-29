using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Teach
{
    public int CrsId { get; set; }

    public int DocId { get; set; }

    public string Semester { get; set; } = null!;

    public virtual Course Crs { get; set; } = null!;

    public virtual Doctor Doc { get; set; } = null!;
}
