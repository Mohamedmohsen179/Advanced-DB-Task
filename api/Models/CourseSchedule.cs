using System;
using System.Collections.Generic;

namespace api.Models;

public partial class CourseSchedule
{
    public int SchId { get; set; }

    public int CrsId { get; set; }

    public string Day { get; set; } = null!;

    public TimeOnly StartHour { get; set; }

    public TimeOnly EndHour { get; set; }

    public int? Level { get; set; }

    public string? Location { get; set; }

    public virtual Course Crs { get; set; } = null!;
}
