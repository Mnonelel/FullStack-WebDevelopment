using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MMSCRUD.Data;
using MMSCRUD.Dtos;
using MMSCRUD.Models;
using Microsoft.AspNetCore.Authorization;

namespace MedicalPracticeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // assistant + doctor (we'll gate specific actions if needed)
    public class PatientsController : ControllerBase
    {
        private readonly MMSDbContext _db;
        public PatientsController(MMSDbContext db) => _db = db;

        [HttpGet]
        public IActionResult GetAll(string? q)
        {
            var query = _db.Patients.AsQueryable();
            if (!string.IsNullOrEmpty(q))
            {
                q = q.ToLower();
                query = query.Where(p => p.P_Name.ToLower().Contains(q) ||
                                         p.P_Surname.ToLower().Contains(q) ||
                                         p.P_Username.ToLower().Contains(q));
            }
            var list = query.Select(p => new PatientDto
            {
                Id = p.Id,
                P_Name = p.P_Name,
                P_Surname = p.P_Surname,
                P_Username = p.P_Username,
                P_Gender = p.P_Gender,
                P_HomeAddress = p.P_HomeAddress,
                P_Email = p.P_Email,
                Phone = p.P_Phone,
                MedicalAid = p.MedicalAid,
                MedicalAidCompany = p.MedicalAidCompany
            }).ToList();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var p = await _db.Patients.FindAsync(id);
            if (p == null) return NotFound();
            return Ok(p);
        }

        [HttpPost]
        [Authorize(Roles = "Assistant")]
        public async Task<IActionResult> Create(PatientDto dto)
        {
            // Check if a patient with the same username already exists
            if (_db.Patients.Any(p => p.P_Username == dto.P_Username))
                return BadRequest("A patient with this username already exists.");

            // Map DTO to entity
            var patient = new Patient
            {
                P_Name = dto.P_Name,
                P_Surname = dto.P_Surname,
                P_Username = dto.P_Username,
                P_Gender = dto.P_Gender,
                P_HomeAddress = dto.P_HomeAddress,
                P_Email = dto.P_Email,
                P_Phone = dto.Phone,
                MedicalAid = dto.MedicalAid,
                MedicalAidCompany = dto.MedicalAidCompany
            };

            // Add to database
            _db.Patients.Add(patient);
            await _db.SaveChangesAsync();

            // Return the created object or success message
            return CreatedAtAction(nameof(Get), new { id = patient.Id }, patient);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Assistant")]
        public async Task<IActionResult> Update(int id, MMSCRUD.Dtos.PatientDto dto)
        {
            var p = await _db.Patients.FindAsync(id);
            if (p == null) return NotFound();
            p.P_Name = dto.P_Name; p.Surname = dto.P_Surname; p.P_Username = dto.P_Username; p.P_Gender = dto.P_Gender;
            p.P_HomeAddress = dto.P_HomeAddress; p.P_Email = dto.P_Email; p.P_Phone = dto.Phone;
            p.MedicalAid = dto.MedicalAid; p.MedicalAidCompany = dto.MedicalAidCompany;
            await _db.SaveChangesAsync();
            return Ok(p);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Assistant")]
        public async Task<IActionResult> Delete(int id)
        {
            var p = await _db.Patients.FindAsync(id);
            if (p == null) return NotFound();
            _db.Patients.Remove(p);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Deleted" });
        }
    }
}
