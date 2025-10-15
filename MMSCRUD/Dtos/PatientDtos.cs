namespace MMSCRUD.Dtos
{
    public class PatientDto
    {
        public Guid Id { get; set; }
        public string P_Name { get; set; }
        public string P_Surname { get; set; }
        public string P_Username { get; set; }
        public string P_Gender { get; set; }
        public string P_HomeAddress { get; set; }
        public string P_Email { get; set; }
        public string Phone { get; set; }
        public bool MedicalAid { get; set; }
        public string MedicalAidCompany { get; set; }
    }
}
