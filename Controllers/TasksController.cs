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

    }
}