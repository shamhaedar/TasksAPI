using Microsoft.EntityFrameworkCore;
using TasksAPI.Models;
namespace TasksAPI
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options) : base(options)
        {
        }
        public DbSet<TaskItem> Tasks { get; set; }
    }
}