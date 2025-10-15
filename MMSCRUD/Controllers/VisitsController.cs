
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MMSCRUD.Data;
using MMSCRUD.Dtos;
using MMSCRUD.Models;
using System.Security.Claims;

namespace MMSCRUD.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Doctor,Administrator")]
    public class VisitsController : ControllerBase
    {
        private readonly MMSDbContext _db;
        public VisitsController(MMSDbContext db) => _db = db;

        // Doctor or Admin can get visits by patient
        [HttpGet("bypatient/{patientId}")]
        public async Task<IActionResult> GetByPatient(int patientId)
        {
            var visits = await _db.Visits
                           .Where(visits => visits.patientId == patientId)
                           .Select(v => new VisitDto
                           {
                               
                               patientId = v.PatientId,
                               DoctorId = v.DoctorId,
                               Timestamp = v.Timestamp,
                               Notes = v.Notes
                           }).ToListAsync();
            return Ok(visits);
        }

        [HttpPost]
        public async Task<IActionResult> Create(VisitDto dto)
        {
            // doctor id is from token unless admin is creating for some reason
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out var userId)) return Unauthorized();

            var visit = new Visit
            {
                PatientId = dto.patientId,
                DoctorId = dto.DoctorId == 0 ? userId : dto.DoctorId,
                Notes = dto.Notes,
                Timestamp = DateTime.UtcNow
            };
            _db.Visits.Add(visit);
            await _db.SaveChangesAsync();
            return Ok(visit);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,VisitDto dto)
        {
            var v = await _db.Visits.FindAsync(id);
            if (v == null) return NotFound();
            v.Notes = dto.Notes;
            await _db.SaveChangesAsync();
            return Ok(v);
        }
    }
}

