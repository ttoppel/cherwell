using Microsoft.EntityFrameworkCore;

namespace Tom.Toppel.Models
{
    public class TriangleContext : DbContext
    {
        public TriangleContext(DbContextOptions<TriangleContext> options)
            : base(options)
        {
        }

        public DbSet<Triangle> TriangleItems { get; set; }

    }
}
