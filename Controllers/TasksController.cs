using Microsoft.AspNetCore.Mvc;

namespace TasksAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        
        [HttpGet]
        public ActionResult GetAllTasks ()
        {
            return Ok("Hi!! this is first endpoint");
        }

    }
}