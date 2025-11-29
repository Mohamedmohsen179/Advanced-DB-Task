using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class mm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Faculty");

            migrationBuilder.CreateTable(
                name: "Course",
                schema: "Faculty",
                columns: table => new
                {
                    Crs_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Crs_Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Discription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Credit_Hours = table.Column<int>(type: "int", nullable: false),
                    Doc_ID = table.Column<int>(type: "int", nullable: false),
                    Dept_ID = table.Column<int>(type: "int", nullable: false),
                    Max_Num_Stu = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.Crs_ID);
                });

            migrationBuilder.CreateTable(
                name: "Course_Schedule",
                schema: "Faculty",
                columns: table => new
                {
                    Sch_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Crs_ID = table.Column<int>(type: "int", nullable: false),
                    Day = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Start_Hour = table.Column<TimeSpan>(type: "time", nullable: false),
                    END_Hour = table.Column<TimeSpan>(type: "time", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course_Schedule", x => new { x.Sch_ID, x.Crs_ID });
                    table.CheckConstraint("CK_Day", "[Day] IN ('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday')");
                    table.ForeignKey(
                        name: "FK_Course_Schedule_Course_Crs_ID",
                        column: x => x.Crs_ID,
                        principalSchema: "Faculty",
                        principalTable: "Course",
                        principalColumn: "Crs_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Departement",
                schema: "Faculty",
                columns: table => new
                {
                    Dept_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Dept_Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Doc_ID = table.Column<int>(type: "int", nullable: false),
                    Establish_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Dept_Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Dept_Code = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departement", x => x.Dept_ID);
                });

            migrationBuilder.CreateTable(
                name: "Doctor",
                schema: "Faculty",
                columns: table => new
                {
                    Doc_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SSN = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false),
                    FName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Hire_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DOB = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: true, computedColumnSql: "(YEAR(GETDATE()) - YEAR([DOB]))"),
                    Gender = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    Hour_Rate = table.Column<int>(type: "int", nullable: false),
                    Hours_Per_Week = table.Column<int>(type: "int", nullable: false),
                    Salary = table.Column<int>(type: "int", nullable: true, computedColumnSql: "([Hour_Rate] * [Hours_Per_Week] * 4)", stored: true),
                    Dept_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctor", x => x.Doc_ID);
                    table.CheckConstraint("CK_Gender_Doctor", "[Gender] IN ('F', 'M')");
                    table.ForeignKey(
                        name: "FK_Doctor_Departement_Dept_ID",
                        column: x => x.Dept_ID,
                        principalSchema: "Faculty",
                        principalTable: "Departement",
                        principalColumn: "Dept_ID");
                });

            migrationBuilder.CreateTable(
                name: "Student",
                schema: "Faculty",
                columns: table => new
                {
                    Stu_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Stu_SSN = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false),
                    FName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    DOB = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: true, computedColumnSql: "(YEAR(GETDATE()) - YEAR([DOB]))"),
                    CGPA = table.Column<decimal>(type: "decimal(3,2)", nullable: false),
                    Dept_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => x.Stu_ID);
                    table.CheckConstraint("CK_Gender_Student", "[Gender] IN ('F', 'M')");
                    table.CheckConstraint("CK_Level", "[Level] >= 1 AND [Level] <= 4");
                    table.ForeignKey(
                        name: "FK_Student_Departement_Dept_ID",
                        column: x => x.Dept_ID,
                        principalSchema: "Faculty",
                        principalTable: "Departement",
                        principalColumn: "Dept_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Doctor_Address",
                schema: "Faculty",
                columns: table => new
                {
                    Doc_ID = table.Column<int>(type: "int", nullable: false),
                    City = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Street = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctor_Address", x => new { x.Doc_ID, x.City, x.Street });
                    table.ForeignKey(
                        name: "FK_Doctor_Address_Doctor_Doc_ID",
                        column: x => x.Doc_ID,
                        principalSchema: "Faculty",
                        principalTable: "Doctor",
                        principalColumn: "Doc_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Doctor_Phone",
                schema: "Faculty",
                columns: table => new
                {
                    Doc_ID = table.Column<int>(type: "int", nullable: false),
                    Phone_NUM = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctor_Phone", x => new { x.Doc_ID, x.Phone_NUM });
                    table.ForeignKey(
                        name: "FK_Doctor_Phone_Doctor_Doc_ID",
                        column: x => x.Doc_ID,
                        principalSchema: "Faculty",
                        principalTable: "Doctor",
                        principalColumn: "Doc_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Teach",
                schema: "Faculty",
                columns: table => new
                {
                    Crs_ID = table.Column<int>(type: "int", nullable: false),
                    Doc_ID = table.Column<int>(type: "int", nullable: false),
                    Semester = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teach", x => new { x.Crs_ID, x.Doc_ID, x.Semester });
                    table.ForeignKey(
                        name: "FK_Teach_Course_Crs_ID",
                        column: x => x.Crs_ID,
                        principalSchema: "Faculty",
                        principalTable: "Course",
                        principalColumn: "Crs_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Teach_Doctor_Doc_ID",
                        column: x => x.Doc_ID,
                        principalSchema: "Faculty",
                        principalTable: "Doctor",
                        principalColumn: "Doc_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Enrollement",
                schema: "Faculty",
                columns: table => new
                {
                    Stu_ID = table.Column<int>(type: "int", nullable: false),
                    Crs_ID = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: false),
                    Grade = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enrollement", x => new { x.Stu_ID, x.Crs_ID, x.Year });
                    table.CheckConstraint("CK_Grade", "[Grade] >= 0 AND [Grade] <= 100");
                    table.ForeignKey(
                        name: "FK_Enrollement_Course_Crs_ID",
                        column: x => x.Crs_ID,
                        principalSchema: "Faculty",
                        principalTable: "Course",
                        principalColumn: "Crs_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Enrollement_Student_Stu_ID",
                        column: x => x.Stu_ID,
                        principalSchema: "Faculty",
                        principalTable: "Student",
                        principalColumn: "Stu_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Student_Address",
                schema: "Faculty",
                columns: table => new
                {
                    Stu_ID = table.Column<int>(type: "int", nullable: false),
                    City = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Street = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student_Address", x => new { x.Stu_ID, x.City, x.Street });
                    table.ForeignKey(
                        name: "FK_Student_Address_Student_Stu_ID",
                        column: x => x.Stu_ID,
                        principalSchema: "Faculty",
                        principalTable: "Student",
                        principalColumn: "Stu_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Student_Phone",
                schema: "Faculty",
                columns: table => new
                {
                    Stu_ID = table.Column<int>(type: "int", nullable: false),
                    Phone_NUM = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student_Phone", x => new { x.Stu_ID, x.Phone_NUM });
                    table.ForeignKey(
                        name: "FK_Student_Phone_Student_Stu_ID",
                        column: x => x.Stu_ID,
                        principalSchema: "Faculty",
                        principalTable: "Student",
                        principalColumn: "Stu_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Course_Dept_ID",
                schema: "Faculty",
                table: "Course",
                column: "Dept_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Course_Doc_ID",
                schema: "Faculty",
                table: "Course",
                column: "Doc_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Course_Schedule_Crs_ID",
                schema: "Faculty",
                table: "Course_Schedule",
                column: "Crs_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Departement_Doc_ID",
                schema: "Faculty",
                table: "Departement",
                column: "Doc_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Doctor_Dept_ID",
                schema: "Faculty",
                table: "Doctor",
                column: "Dept_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollement_Crs_ID",
                schema: "Faculty",
                table: "Enrollement",
                column: "Crs_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Student_Dept_ID",
                schema: "Faculty",
                table: "Student",
                column: "Dept_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Teach_Doc_ID",
                schema: "Faculty",
                table: "Teach",
                column: "Doc_ID");

            // Use NoAction here to avoid multiple cascade paths from Department -> Student/Course -> Enrollement
            migrationBuilder.AddForeignKey(
                name: "FK_Course_Departement_Dept_ID",
                schema: "Faculty",
                table: "Course",
                column: "Dept_ID",
                principalSchema: "Faculty",
                principalTable: "Departement",
                principalColumn: "Dept_ID",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Doctor_Doc_ID",
                schema: "Faculty",
                table: "Course",
                column: "Doc_ID",
                principalSchema: "Faculty",
                principalTable: "Doctor",
                principalColumn: "Doc_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Departement_Doctor_Doc_ID",
                schema: "Faculty",
                table: "Departement",
                column: "Doc_ID",
                principalSchema: "Faculty",
                principalTable: "Doctor",
                principalColumn: "Doc_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctor_Departement_Dept_ID",
                schema: "Faculty",
                table: "Doctor");

            migrationBuilder.DropTable(
                name: "Course_Schedule",
                schema: "Faculty");

            migrationBuilder.DropTable(
                name: "Doctor_Address",
                schema: "Faculty");

            migrationBuilder.DropTable(
                name: "Doctor_Phone",
                schema: "Faculty");

            migrationBuilder.DropTable(
                name: "Enrollement",
                schema: "Faculty");

            migrationBuilder.DropTable(
                name: "Student_Address",
                schema: "Faculty");

            migrationBuilder.DropTable(
                name: "Student_Phone",
                schema: "Faculty");

            migrationBuilder.DropTable(
                name: "Teach",
                schema: "Faculty");

            migrationBuilder.DropTable(
                name: "Student",
                schema: "Faculty");

            migrationBuilder.DropTable(
                name: "Course",
                schema: "Faculty");

            migrationBuilder.DropTable(
                name: "Departement",
                schema: "Faculty");

            migrationBuilder.DropTable(
                name: "Doctor",
                schema: "Faculty");
        }
    }
}
