using Microsoft.EntityFrameworkCore;
namespace Persona.Models
{
    public class AplicationDbContext: DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options) 
        {
        }
        public DbSet<Personas> Persona { get; set; }
    }
}
