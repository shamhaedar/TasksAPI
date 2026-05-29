using Microsoft.AspNetCore.Mvc;
using TasksAPI.Models;

namespace TasksAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;
        public TasksController(TaskContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public ActionResult GetAllTasks ()
        {
           var tasks = _context.Tasks.ToList();
           return Ok(tasks);
        }
         [HttpGet("{id}")]
        public IActionResult GetTaskById([FromRoute]int id)
        {
            var task =_context.Tasks.FirstOrDefault(t => t.Id == id);
            if(task == null)
            {
                return NotFound($"Task with id {id} not found.");
            }
            return Ok(task);
        }
        [HttpPost]
        public IActionResult CreateTask([FromBody]TaskItem newTask)
        {
            newTask.CreatedAt = DateTime.Now;
            _context.Tasks.Add(newTask);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetAllTasks), new { id = newTask.Id }, newTask);
        }
       
        [HttpPut("{id}")]
        public IActionResult UpdateTask([FromRoute]int id, [FromBody] TaskItem updatedTask)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if(task == null)
            {
                return NotFound($"Task with id {id} not found.");
            }
            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.IsCompleted = updatedTask.IsCompleted;
            task.priority = updatedTask.priority;
            _context.SaveChanges();
            return Ok (task);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteTask([FromRoute]int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if(task == null)
            {
                return NotFound($"Task with id {id} not found.");
            }
            _context.Tasks.Remove(task);
            _context.SaveChanges();
            return NoContent();
        }
         

    }
}