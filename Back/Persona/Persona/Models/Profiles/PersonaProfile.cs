using AutoMapper;
using Persona.Models.DTO;

namespace Persona.Models.Profiles
{
    public class PersonaProfile:Profile
    {
        public PersonaProfile()
        {
            CreateMap<Personas, PersonaDTO>();
            CreateMap<PersonaDTO, Personas>();
        }
    }
}
