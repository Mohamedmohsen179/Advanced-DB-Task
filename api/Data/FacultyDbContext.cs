using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class FacultyDbContext : DbContext
    {
        public FacultyDbContext(DbContextOptions<FacultyDbContext> options) : base(options)
        {
        }

        // DbSets for all entities
        public DbSet<Department> Departments { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseSchedule> CourseSchedules { get; set; }
        public DbSet<Enrollement> Enrollements { get; set; }
        public DbSet<Teach> TeachAssignments { get; set; }
        public DbSet<DoctorPhone> DoctorPhones { get; set; }
        public DbSet<DoctorAddress> DoctorAddresses { get; set; }
        public DbSet<StudentPhone> StudentPhones { get; set; }
        public DbSet<StudentAddress> StudentAddresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure composite keys
            modelBuilder.Entity<CourseSchedule>()
                .HasKey(cs => new { cs.Sch_ID, cs.Crs_ID });

            modelBuilder.Entity<Enrollement>()
                .HasKey(e => new { e.Stu_ID, e.Crs_ID, e.Year });

            modelBuilder.Entity<Teach>()
                .HasKey(t => new { t.Crs_ID, t.Doc_ID, t.Semester });

            modelBuilder.Entity<DoctorPhone>()
                .HasKey(dp => new { dp.Doc_ID, dp.Phone_NUM });

            modelBuilder.Entity<DoctorAddress>()
                .HasKey(da => new { da.Doc_ID, da.City, da.Street });

            modelBuilder.Entity<StudentPhone>()
                .HasKey(sp => new { sp.Stu_ID, sp.Phone_NUM });

            modelBuilder.Entity<StudentAddress>()
                .HasKey(sa => new { sa.Stu_ID, sa.City, sa.Street });

            // Configure relationships
            modelBuilder.Entity<Department>()
                .HasOne(d => d.HeadDoctor)
                .WithMany()
                .HasForeignKey(d => d.Doc_ID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Doctor>()
                .HasOne(d => d.Department)
                .WithMany(dept => dept.Doctors)
                .HasForeignKey(d => d.Dept_ID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Student>()
                .HasOne(s => s.Department)
                .WithMany(d => d.Students)
                .HasForeignKey(s => s.Dept_ID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Course>()
                .HasOne(c => c.Instructor)
                .WithMany(d => d.Courses)
                .HasForeignKey(c => c.Doc_ID)
                .OnDelete(DeleteBehavior.NoAction);

            // Course -> Department can NOT use Cascade in SQL Server because of multiple cascade paths
            modelBuilder.Entity<Course>()
                .HasOne(c => c.Department)
                .WithMany(d => d.Courses)
                .HasForeignKey(c => c.Dept_ID)
                .OnDelete(DeleteBehavior.NoAction);

            // Configure computed columns
            modelBuilder.Entity<Doctor>()
                .Property(d => d.Age)
                .HasComputedColumnSql("(YEAR(GETDATE()) - YEAR([DOB]))");

            modelBuilder.Entity<Doctor>()
                .Property(d => d.Salary)
                .HasComputedColumnSql("([Hour_Rate] * [Hours_Per_Week] * 4)", stored: true);

            modelBuilder.Entity<Student>()
                .Property(s => s.Age)
                .HasComputedColumnSql("(YEAR(GETDATE()) - YEAR([DOB]))");

            // Configure Gender constraint
            modelBuilder.Entity<Doctor>()
                .ToTable(t => t.HasCheckConstraint("CK_Gender_Doctor", "[Gender] IN ('F', 'M')"));

            modelBuilder.Entity<Student>()
                .ToTable(t => t.HasCheckConstraint("CK_Gender_Student", "[Gender] IN ('F', 'M')"));

            // Configure Level constraint
            modelBuilder.Entity<Student>()
                .ToTable(t => t.HasCheckConstraint("CK_Level", "[Level] >= 1 AND [Level] <= 4"));

            // Configure Day constraint for Course Schedule
            modelBuilder.Entity<CourseSchedule>()
                .ToTable(t => t.HasCheckConstraint("CK_Day", "[Day] IN ('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday')"));

            // Configure Grade constraint for Enrollment
            modelBuilder.Entity<Enrollement>()
                .ToTable(t => t.HasCheckConstraint("CK_Grade", "[Grade] >= 0 AND [Grade] <= 100"));
        }
    }
}

