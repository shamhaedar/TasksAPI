
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasksAPI.Models
{
    public class TaskItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public  string Title { get; set; } = string.Empty;
        public string priority {get; set;}="Medium";
        public  string Description { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }= false;
        public DateTime CreatedAt { get; set; }=DateTime.Now;
    }
}