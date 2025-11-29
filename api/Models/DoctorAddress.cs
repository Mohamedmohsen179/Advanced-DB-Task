using System;
using System.Collections.Generic;

namespace api.Models;

public partial class DoctorAddress
{
    public int DocId { get; set; }

    public string City { get; set; } = null!;

    public string Street { get; set; } = null!;

    public virtual Doctor Doc { get; set; } = null!;
}
