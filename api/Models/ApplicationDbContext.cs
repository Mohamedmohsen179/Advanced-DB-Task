using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<CourseSchedule> CourseSchedules { get; set; }

    public virtual DbSet<Departement> Departements { get; set; }

    public virtual DbSet<Doctor> Doctors { get; set; }

    public virtual DbSet<DoctorAddress> DoctorAddresses { get; set; }

    public virtual DbSet<DoctorPhone> DoctorPhones { get; set; }

    public virtual DbSet<DoctorRateAudit> DoctorRateAudits { get; set; }

    public virtual DbSet<Enrollement> Enrollements { get; set; }

    public virtual DbSet<PublicDoctorInfoView> PublicDoctorInfoViews { get; set; }

    public virtual DbSet<PublicScheduleView> PublicScheduleViews { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<StudentAddress> StudentAddresses { get; set; }

    public virtual DbSet<StudentDetailsView> StudentDetailsViews { get; set; }

    public virtual DbSet<StudentPhone> StudentPhones { get; set; }

    public virtual DbSet<Teach> Teaches { get; set; }

    public virtual DbSet<TopPerformersView> TopPerformersViews { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.;Database=Faculty_System;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CrsId).HasName("PK__Course__56CAA5F5F3C564FF");

            entity.ToTable("Course", "Faculty");

            entity.HasIndex(e => e.CrsName, "UQ__Course__E2D24123780B2D29").IsUnique();

            entity.Property(e => e.CrsId).HasColumnName("Crs_ID");
            entity.Property(e => e.CreditHours).HasColumnName("Credit_Hours");
            entity.Property(e => e.CrsName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Crs_Name");
            entity.Property(e => e.DeptId).HasColumnName("Dept_ID");
            entity.Property(e => e.Discription)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.DocId).HasColumnName("Doc_ID");

            entity.HasOne(d => d.Dept).WithMany(p => p.Courses)
                .HasForeignKey(d => d.DeptId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CRS_DEPT");

            entity.HasOne(d => d.Doc).WithMany(p => p.Courses)
                .HasForeignKey(d => d.DocId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CRS_DOC");
        });

        modelBuilder.Entity<CourseSchedule>(entity =>
        {
            entity.HasKey(e => new { e.SchId, e.CrsId }).HasName("PK_CRS_SCH");

            entity.ToTable("Course_Schedule", "Faculty");

            entity.Property(e => e.SchId)
                .ValueGeneratedOnAdd()
                .HasColumnName("Sch_ID");
            entity.Property(e => e.CrsId).HasColumnName("Crs_ID");
            entity.Property(e => e.Day)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.EndHour).HasColumnName("END_Hour");
            entity.Property(e => e.Location)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.StartHour).HasColumnName("Start_Hour");

            entity.HasOne(d => d.Crs).WithMany(p => p.CourseSchedules)
                .HasForeignKey(d => d.CrsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CRS_SCH");
        });

        modelBuilder.Entity<Departement>(entity =>
        {
            entity.HasKey(e => e.DeptId).HasName("PK__Departem__72ABC12C388F99A9");

            entity.ToTable("Departement", "Faculty");

            entity.Property(e => e.DeptId)
                .ValueGeneratedNever()
                .HasColumnName("Dept_ID");
            entity.Property(e => e.DeptName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Dept_Name");
            entity.Property(e => e.DocId).HasColumnName("Doc_ID");

            entity.HasOne(d => d.Doc).WithMany(p => p.Departements)
                .HasForeignKey(d => d.DocId)
                .HasConstraintName("FK_DEPT_HDOCTOR");
        });

        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.HasKey(e => e.DocId).HasName("PK__Doctor__464738217270B0AA");

            entity.ToTable("Doctor", "Faculty", tb => tb.HasTrigger("trg_Doctor_Rate_Audit"));

            entity.HasIndex(e => e.Username, "UQ__Doctor__536C85E4522BA073").IsUnique();

            entity.HasIndex(e => e.Password, "UQ__Doctor__87909B153C80DE7F").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Doctor__A9D1053423AD426D").IsUnique();

            entity.HasIndex(e => e.Ssn, "UQ__Doctor__CA1E8E3CEC7B5F96").IsUnique();

            entity.Property(e => e.DocId)
                .ValueGeneratedNever()
                .HasColumnName("Doc_ID");
            entity.Property(e => e.Age).HasComputedColumnSql("(datepart(year,getdate())-datepart(year,[DOB]))", false);
            entity.Property(e => e.DeptId).HasColumnName("Dept_ID");
            entity.Property(e => e.Dob).HasColumnName("DOB");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Fname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("FName");
            entity.Property(e => e.Gender)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.HireDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("Hire_Date");
            entity.Property(e => e.HourRate).HasColumnName("Hour_Rate");
            entity.Property(e => e.HoursPerWeek).HasColumnName("Hours_Per_Week");
            entity.Property(e => e.Lname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("LName");
            entity.Property(e => e.Password)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Salary).HasComputedColumnSql("(([Hour_Rate]*[Hours_Per_Week])*(4))", true);
            entity.Property(e => e.Ssn)
                .HasMaxLength(14)
                .IsUnicode(false)
                .HasColumnName("SSN");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Dept).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.DeptId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DEPT_NUM");
        });

        modelBuilder.Entity<DoctorAddress>(entity =>
        {
            entity.HasKey(e => new { e.DocId, e.City, e.Street }).HasName("PK__Doctor_A__A7469000E5EA91EA");

            entity.ToTable("Doctor_Address", "Faculty");

            entity.Property(e => e.DocId).HasColumnName("Doc_ID");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Street)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Doc).WithMany(p => p.DoctorAddresses)
                .HasForeignKey(d => d.DocId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Doctor_Ad__Doc_I__628FA481");
        });

        modelBuilder.Entity<DoctorPhone>(entity =>
        {
            entity.HasKey(e => new { e.DocId, e.PhoneNum }).HasName("PK_DOC_PHONE");

            entity.ToTable("Doctor_Phone", "Faculty");

            entity.Property(e => e.DocId).HasColumnName("Doc_ID");
            entity.Property(e => e.PhoneNum)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Phone_NUM");

            entity.HasOne(d => d.Doc).WithMany(p => p.DoctorPhones)
                .HasForeignKey(d => d.DocId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NUM_DOC");
        });

        modelBuilder.Entity<DoctorRateAudit>(entity =>
        {
            entity.HasKey(e => e.AuditId).HasName("PK__DoctorRa__A17F23B879CBC271");

            entity.ToTable("DoctorRateAudit", "Faculty");

            entity.Property(e => e.AuditId).HasColumnName("AuditID");
            entity.Property(e => e.ChangeDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("Change_Date");
            entity.Property(e => e.ChangedBy)
                .HasMaxLength(128)
                .IsUnicode(false)
                .HasDefaultValueSql("(suser_sname())")
                .HasColumnName("Changed_By");
            entity.Property(e => e.DocId).HasColumnName("Doc_ID");
            entity.Property(e => e.NewRate).HasColumnName("New_Rate");
            entity.Property(e => e.OldRate).HasColumnName("Old_Rate");
        });

        modelBuilder.Entity<Enrollement>(entity =>
        {
            entity.HasKey(e => new { e.StuId, e.CrsId, e.Year }).HasName("PK_STU_ENROLL");

            entity.ToTable("Enrollement", "Faculty");

            entity.Property(e => e.StuId).HasColumnName("Stu_ID");
            entity.Property(e => e.CrsId).HasColumnName("Crs_ID");
            entity.Property(e => e.Year)
                .HasMaxLength(7)
                .IsUnicode(false);

            entity.HasOne(d => d.Crs).WithMany(p => p.Enrollements)
                .HasForeignKey(d => d.CrsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Crs_ENROLL");

            entity.HasOne(d => d.Stu).WithMany(p => p.Enrollements)
                .HasForeignKey(d => d.StuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_STU_ENROLL");
        });

        modelBuilder.Entity<PublicDoctorInfoView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("PublicDoctorInfoView", "Faculty");

            entity.Property(e => e.DeptName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Dept_Name");
            entity.Property(e => e.DocId).HasColumnName("Doc_ID");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Fname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("FName");
            entity.Property(e => e.HireDate).HasColumnName("Hire_Date");
            entity.Property(e => e.Lname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("LName");
        });

        modelBuilder.Entity<PublicScheduleView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("PublicScheduleView", "Faculty");

            entity.Property(e => e.CourseDescription)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("Course_Description");
            entity.Property(e => e.CourseName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Course_Name");
            entity.Property(e => e.EndsAt).HasColumnName("Ends_At");
            entity.Property(e => e.InstructorName)
                .HasMaxLength(101)
                .IsUnicode(false)
                .HasColumnName("Instructor_Name");
            entity.Property(e => e.MeetingDay)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("Meeting_Day");
            entity.Property(e => e.RoomLocation)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Room_Location");
            entity.Property(e => e.StartsAt).HasColumnName("Starts_At");
            entity.Property(e => e.TargetLevel).HasColumnName("Target_Level");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StuId).HasName("PK__Student__DD8D49813DC89FED");

            entity.ToTable("Student", "Faculty", tb => tb.HasTrigger("trg_Student_Level4_CGPA_Check"));

            entity.HasIndex(e => e.Username, "UQ__Student__536C85E4C2A9C918").IsUnique();

            entity.HasIndex(e => e.StuSsn, "UQ__Student__8E50594FFABD6A76").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Student__A9D10534DE4B0D0E").IsUnique();

            entity.Property(e => e.StuId)
                .ValueGeneratedNever()
                .HasColumnName("Stu_ID");
            entity.Property(e => e.Age).HasComputedColumnSql("(datepart(year,getdate())-datepart(year,[DOB]))", false);
            entity.Property(e => e.Cgpa)
                .HasColumnType("decimal(3, 2)")
                .HasColumnName("CGPA");
            entity.Property(e => e.DeptId).HasColumnName("Dept_ID");
            entity.Property(e => e.Dob).HasColumnName("DOB");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Fname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("FName");
            entity.Property(e => e.Gender)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.Lname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("LName");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.StuSsn)
                .HasMaxLength(14)
                .IsUnicode(false)
                .HasColumnName("Stu_SSN");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Dept).WithMany(p => p.Students)
                .HasForeignKey(d => d.DeptId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_STU_DEPT");
        });

        modelBuilder.Entity<StudentAddress>(entity =>
        {
            entity.HasKey(e => new { e.StuId, e.City, e.Street }).HasName("PK__Student___3C8CE1A0341A8425");

            entity.ToTable("Student_Address", "Faculty");

            entity.Property(e => e.StuId).HasColumnName("Stu_ID");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Street)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Stu).WithMany(p => p.StudentAddresses)
                .HasForeignKey(d => d.StuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Student_A__Stu_I__68487DD7");
        });

        modelBuilder.Entity<StudentDetailsView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("StudentDetailsView", "Faculty");

            entity.Property(e => e.DeptName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Dept_Name");
            entity.Property(e => e.FullName)
                .HasMaxLength(101)
                .IsUnicode(false);
            entity.Property(e => e.PrimaryPhone)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.StuId).HasColumnName("Stu_ID");
        });

        modelBuilder.Entity<StudentPhone>(entity =>
        {
            entity.HasKey(e => new { e.StuId, e.PhoneNum }).HasName("PK_Stu_PHONE");

            entity.ToTable("Student_Phone", "Faculty");

            entity.Property(e => e.StuId).HasColumnName("Stu_ID");
            entity.Property(e => e.PhoneNum)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Phone_NUM");

            entity.HasOne(d => d.Stu).WithMany(p => p.StudentPhones)
                .HasForeignKey(d => d.StuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NUM_STU");
        });

        modelBuilder.Entity<Teach>(entity =>
        {
            entity.HasKey(e => new { e.CrsId, e.DocId, e.Semester }).HasName("PK_TEACH");

            entity.ToTable("Teach", "Faculty");

            entity.Property(e => e.CrsId).HasColumnName("Crs_ID");
            entity.Property(e => e.DocId).HasColumnName("Doc_ID");
            entity.Property(e => e.Semester)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Crs).WithMany(p => p.Teaches)
                .HasForeignKey(d => d.CrsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CRS_TEACH");

            entity.HasOne(d => d.Doc).WithMany(p => p.Teaches)
                .HasForeignKey(d => d.DocId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DOC_TEACH");
        });

        modelBuilder.Entity<TopPerformersView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("TopPerformersView", "Faculty");

            entity.Property(e => e.CourseTitle)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.StuId).HasColumnName("Stu_ID");
            entity.Property(e => e.StudentFullName)
                .HasMaxLength(101)
                .IsUnicode(false);
            entity.Property(e => e.Year)
                .HasMaxLength(7)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
