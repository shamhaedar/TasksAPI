using Microsoft.AspNetCore.Mvc;
using TasksAPI.Models;

namespace TasksAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static List<TaskItem> tasks = new List<TaskItem>
        {
            new TaskItem { Id = 1, Title = "Learn .NET", Description = "Study ASP.NET Core", IsCompleted = false },
            new TaskItem { Id = 2, Title = "Build API", Description = "Build Tasks API", IsCompleted = false },
            new TaskItem { Id = 3, Title = "Push to GitHub", Description = "Push project to GitHub", IsCompleted= true }
        };
        
        [HttpGet]
        public ActionResult GetAllTasks ()
        {
            return Ok(tasks);
        }
        [HttpPost]
        public IActionResult CreateTask([FromBody]TaskItem newTask)
        {
            newTask.Id = tasks.Count + 1;
            newTask.CreatedAt = DateTime.Now;
            tasks.Add(newTask);
            return CreatedAtAction(nameof(GetAllTasks), new { id = newTask.Id }, newTask);
        }
        [HttpGet("{id}")]
        public IActionResult GetTaskById([FromRoute]int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if(task == null)
            {
                return NotFound($"Task with id {id} not found.");
            }
            return Ok(task);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateTask([FromRoute]int id, [FromBody] TaskItem updatedTask)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if(task == null)
            {
                return NotFound($"Task with id {id} not found.");
            }
            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.IsCompleted = updatedTask.IsCompleted;
            return Ok (task);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteTask([FromRoute]int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if(task == null)
            {
                return NotFound($"Task with id {id} not found.");
            }
            tasks.Remove(task);
            return NoContent();
        }
         

    }
}