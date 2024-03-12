using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryAdminAPI.Data;
using LibraryAdminAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryAdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalHistoryController : ControllerBase
    {
        private readonly DataContext _context;

        public RentalHistoryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetRentalHistory")]
        public async Task<ActionResult<List<RentalHistory>>> GetRentalHistory()
        {
            var res = await _context.RentalHistories
                .Include("Book").Include("Customer")
                .ToListAsync();
            return Ok(res);
        }
    }
}



