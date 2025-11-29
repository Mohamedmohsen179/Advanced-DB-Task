using System;
using System.Collections.Generic;

namespace api.Models;

public partial class PublicScheduleView
{
    public string CourseName { get; set; } = null!;

    public string CourseDescription { get; set; } = null!;

    public string MeetingDay { get; set; } = null!;

    public TimeOnly StartsAt { get; set; }

    public TimeOnly EndsAt { get; set; }

    public int? TargetLevel { get; set; }

    public string? RoomLocation { get; set; }

    public string InstructorName { get; set; } = null!;
}
