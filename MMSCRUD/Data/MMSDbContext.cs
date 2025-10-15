using Microsoft.EntityFrameworkCore;
using MMSCRUD.Models;
namespace MMSCRUD.Data
{
    public class MMSDbContext : DbContext
    {
        public MMSDbContext(DbContextOptions<MMSDbContext> options) :base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Visit> Visits { get; set; }
    }
}
