using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundResult()
        {
            var thing = _context.Products.Find(42);
            if(thing == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }
        
        [HttpGet("servererror")]
        public ActionResult GetBadRequest()
        {
            return BadRequest();
        }

        [HttpGet("badrequest")]
        public ActionResult GetServerError()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundResult(int id)
        {
            return Ok();
        }
    }
}