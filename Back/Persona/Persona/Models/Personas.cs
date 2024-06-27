namespace Persona.Models
{
    public class Personas
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string  Surname { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public string img { get; set; }
        public DateTime AddDate { get; set; }
    }
    public enum Gender
    {
        Masculino,
        Femenino,
        Otro
    }
}
