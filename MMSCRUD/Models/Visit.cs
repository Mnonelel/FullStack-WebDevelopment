
using System.ComponentModel.DataAnnotations.Schema;

namespace MMSCRUD.Models
{
    public class Visit
    {
        //public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public int patientId { get; internal set; }
        [ForeignKey(nameof(PatientId))] public Patient Patient { get; set; }

        public int DoctorId { get; set; }
        [ForeignKey(nameof(DoctorId))] public User Doctor { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Notes { get; set; }
    }
}
