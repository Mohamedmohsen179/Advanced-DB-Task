using System;
using System.Collections.Generic;

namespace api.Models;

public partial class DoctorPhone
{
    public int DocId { get; set; }

    public string PhoneNum { get; set; } = null!;

    public virtual Doctor Doc { get; set; } = null!;
}
