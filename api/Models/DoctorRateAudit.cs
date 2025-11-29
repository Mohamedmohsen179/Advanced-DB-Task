using System;
using System.Collections.Generic;

namespace api.Models;

public partial class DoctorRateAudit
{
    public int AuditId { get; set; }

    public int DocId { get; set; }

    public int? OldRate { get; set; }

    public int? NewRate { get; set; }

    public DateTime? ChangeDate { get; set; }

    public string? ChangedBy { get; set; }
}
