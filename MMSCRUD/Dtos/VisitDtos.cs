namespace MMSCRUD.Dtos
{
    public class VisitDto
    {
        //public Guid Id { get; set; }
        public Guid patientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime Timestamp { get; set; }
        public string Notes { get; set; }
    }
}
