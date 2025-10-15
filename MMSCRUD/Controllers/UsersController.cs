using MMSCRUD.Data;
using MMSCRUD.Dtos;
using MMSCRUD.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MedicalPracticeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Administrator")]
    public class UsersController : ControllerBase
    {
        private readonly MMSDbContext _db;
        private readonly IPasswordHasher<User> _hasher;

        public UsersController(MMSDbContext db, IPasswordHasher<User> hasher)
        {
            _db = db;
            _hasher = hasher;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(RegisterUserDto dto)
        {
            if (_db.Users.Any(u => u.Username == dto.Username))
                return BadRequest("Username already exists");

            var user = new User
            {
                Username = dto.Username,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Phone = dto.Phone,
                Role = Enum.Parse<Role>(dto.Role)
            };
            user.PasswordHash = _hasher.HashPassword(user, dto.Password);
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok(new { message = "User created" });
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _db.Users.Select(u => new {
                u.Id,
                u.Username,
                u.FirstName,
                u.LastName,
                Role = u.Role.ToString(),
                u.Email,
                u.Phone
            }).ToList();
            return Ok(users);
        }
    }
}

