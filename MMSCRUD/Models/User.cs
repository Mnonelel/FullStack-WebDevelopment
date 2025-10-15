using System.ComponentModel.DataAnnotations;

namespace MMSCRUD.Models
{
    public enum Role
    {
        Administrator,
        Assistant,
        Doctor
    }
    public class User
    {
        public Guid Id { get; set; }
         public required string Username { get; set; }
        public required string PasswordHash { get; set; }
         public required string FirstName { get; set; }
         public required string LastName { get; set; }
         public required Role Role { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

    }
}
