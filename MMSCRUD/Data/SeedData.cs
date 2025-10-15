using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using MMSCRUD.Models;

namespace MMSCRUD.Data
{
    public class SeedData
    {
        public static async Task EnsureSeedData(IServiceProvider services)
        {
            var db = services.GetRequiredService<MMSDbContext>();
            var passwordHasher = services.GetRequiredService<IPasswordHasher<User>>();

            if (!db.Users.Any(u => u.Username == "admin"))
            {
                var admin = new User
                {
                    Username = "admin",
                    FirstName = "System",
                    LastName = "Admin",
                    Email = "admin@example.com",
                    Role = Role.Administrator
                };
                admin.PasswordHash = passwordHasher.HashPassword(admin, "Admin@123"); // default password
                db.Users.Add(admin);
            }

            // Add an example doctor and assistant for convenience
            if (!db.Users.Any(u => u.Username == "doctor1"))
            {
                var doc = new User
                {
                    Username = "doctor1",
                    FirstName = "John",
                    LastName = "Doe",
                    Role = Role.Doctor
                };
                doc.PasswordHash = passwordHasher.HashPassword(doc, "Doctor@123");
                db.Users.Add(doc);
            }
            if (!db.Users.Any(u => u.Username == "assistant1"))
            {
                var asst = new User
                {
                    Username = "assistant1",
                    FirstName = "Jane",
                    LastName = "Smith",
                    Role = Role.Assistant
                };
                asst.PasswordHash = passwordHasher.HashPassword(asst, "Assistant@123");
                db.Users.Add(asst);
            }

            await db.SaveChangesAsync();
        }
    }
}
