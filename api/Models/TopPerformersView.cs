using System;
using System.Collections.Generic;

namespace api.Models;

public partial class TopPerformersView
{
    public int StuId { get; set; }

    public string StudentFullName { get; set; } = null!;

    public string CourseTitle { get; set; } = null!;

    public int? Grade { get; set; }

    public string Year { get; set; } = null!;
}
