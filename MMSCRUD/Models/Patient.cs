using System.ComponentModel.DataAnnotations;

namespace MMSCRUD.Models
{
    public class Patient
    {
        internal object Name;

        public Guid Id { get; set; }
        public required string P_Name { get; set; }
        public required string P_Surname { get; set; }
        public required string P_Username { get; set; }
        public required string P_Gender { get; set; } 
        public required string P_HomeAddress { get; set; }
        public required string P_Email { get; set; }
        public required string P_Phone { get; set; }
        public required bool MedicalAid { get; set; }
        public string MedicalAidCompany { get; set; }
        public object Surname { get; internal set; }
    }
}
