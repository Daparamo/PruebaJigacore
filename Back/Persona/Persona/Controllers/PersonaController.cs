using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persona.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Persona.Models.DTO;

namespace Persona.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        private readonly IMapper _mapper;

        public PersonaController(AplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listPersonas = await _context.Persona.ToListAsync();

                var listPersonasDTO = _mapper.Map<IEnumerable<PersonaDTO>>(listPersonas);
                return Ok(listPersonasDTO);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var Persona = await _context.Persona.FindAsync(id);
                if(Persona == null)
                {
                    return NotFound();
                }

                var personaDTO = _mapper.Map<PersonaDTO>(Persona);
                return Ok(personaDTO);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var person = await _context.Persona.FindAsync(id);
                if(person == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Persona.Remove(person);
                    await _context.SaveChangesAsync();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(PersonaDTO personaDto)
        {
            try
            {
                var persona = _mapper.Map<Personas>(personaDto);
                persona.AddDate = DateTime.Now;
                _context.Add(persona);   
                await _context.SaveChangesAsync();
                var mascotaItemDto = _mapper.Map<PersonaDTO>(persona);
                return CreatedAtAction("Get", new { id= mascotaItemDto.Id }, mascotaItemDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, PersonaDTO personaDto)
        {
            try
            {
                var persona = _mapper.Map<Personas>(personaDto);
                if (id != persona.Id)
                {
                    return BadRequest();
                }
                var personaItem = await _context.Persona.FindAsync(id);
                if (personaItem == null)
                {
                    return BadRequest();
                }
                personaItem.Name = persona.Name;
                personaItem.Surname = persona.Surname;
                personaItem.Email = persona.Email;
                personaItem.BirthDate = persona.BirthDate;
                personaItem.Gender = persona.Gender;
                personaItem.img = persona.img;

                _context.Update(personaItem);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
