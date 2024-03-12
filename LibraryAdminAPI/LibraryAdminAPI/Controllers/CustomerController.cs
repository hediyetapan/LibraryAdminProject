using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using LibraryAdminAPI.Data;
using LibraryAdminAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryAdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly DataContext _context;

        public CustomerController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetCustomers")]
        public async Task<ActionResult<List<Customer>>> GetCustomers()
        {
            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpGet("GetCustomersCurrentRentals")]
        public async Task<ActionResult<List<Customer>>> GetCustomersCurrentRentals(int CId)
        {
            var dbRentalHistories = await _context.RentalHistories
                .Where(rh => rh.DeliverDate == null)
                .Where(rh => rh.Customer.Id == CId)
                .ToListAsync();

            return Ok(dbRentalHistories);
        }

        [HttpGet("GetCustomersPreviousRentals")]
        public async Task<ActionResult<List<Customer>>> GetCustomersPreviousRentals(int CId)
        {
            var dbRentalHistories = await _context.RentalHistories
                .Where(rh => rh.DeliverDate != null)
                .Where(rh => rh.Customer.Id == CId)
                .ToListAsync();

            return Ok(dbRentalHistories);
        }



        [HttpPost]
        [Route("AddCustomer")]
        public async Task<ActionResult<List<Customer>>> AddCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpPut]
        [Route("UpdateCustomer")]
        public async Task<ActionResult<List<Customer>>> UpdateCustomer(Customer customer)
        {
            var dbCustomer = await _context.Customers.FindAsync(customer.Id);
            if (dbCustomer == null)
            {
                return BadRequest("Customer does not exist.");
            }

            dbCustomer.FirstName = customer.FirstName;
            dbCustomer.LastName = customer.LastName;
            dbCustomer.Email = customer.Email;
            dbCustomer.Address = customer.Address;

            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpPut]
        [Route("RentBook")]
        public async Task<ActionResult<List<Customer>>> RentBook(int CId, int BId)
        {   
            var dbCustomer = await _context.Customers.FindAsync(CId);
            var dbBook = await _context.Books.FindAsync(BId);

            if (dbCustomer == null)
            {
                return BadRequest("Customer does not exist.");
            }
            else if (dbBook == null)
            {
                return BadRequest("Book does not exist.");
            }

            //check if book is rented already by another customer
            var dbRentalHistories = await _context.RentalHistories
                //.Where(rh => rh.Book.Id == BId)
                //.Where(rh => rh.Customer.Id == CId)
                .ToListAsync();

            var alreadyRented = false;


            for (int i = 0; i < dbRentalHistories.Count(); i++)
            {
                if (dbRentalHistories[i].Book?.Id == BId && dbRentalHistories[i].Customer?.Id == CId)
                {
                    if (dbRentalHistories[i].DeliverDate == null)
                    {
                        alreadyRented = true;
                        break;
                    }
                }
                
            }

            if (alreadyRented)
            {
                return BadRequest("Book is already rented by another customer.");
            }
            else
            {
                RentalHistory dbRentalHistory = new RentalHistory
                {
                    Book = dbBook,
                    Customer = dbCustomer,
                    RentDate = DateTime.Now,
                    DeliverDate = null,
                    BookId = dbBook.Id,
                    CustomerId = dbCustomer.Id
                };

                //dbRentalHistory.Customer = dbCustomer;

                _context.RentalHistories.Add(dbRentalHistory);

                dbCustomer.RentalHistories ??= new List<RentalHistory>();
                dbCustomer.RentalHistories.Add(dbRentalHistory);

                dbBook.RentalHistories ??= new List<RentalHistory>();
                dbBook.RentalHistories.Add(dbRentalHistory);
            }

            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpPut]
        [Route("DeliverBook")]
        public async Task<ActionResult<List<Customer>>> DeliverBook(int CId, int BId)
        {
            var dbCustomer = await _context.Customers.FindAsync(CId);
            var dbBook = await _context.Books.FindAsync(BId);
            var dbRentalHistories = await _context.RentalHistories
                .ToListAsync();
            

            if (dbCustomer == null)
            {
                return BadRequest("Customer does not exist.");
            }
            else if (dbBook == null)
            {
                return BadRequest("Book does not exist.");
            }

            //check if book is currently rented
            var bookMatchCustomer = false;
            var isBookCurrentlyRented = false;

            for (int i = 0; i < dbRentalHistories.Count(); i++)
            {
                if (dbRentalHistories[i].Book.Id == BId)
                {
                    if (dbRentalHistories[i].DeliverDate == null)
                    {
                        isBookCurrentlyRented = true;
                        break;
                    }
                }
            }

            if (!isBookCurrentlyRented)
            {
                return BadRequest("This book is not rented by anyone so it cannot be delivered.");
            }
            else
            {
                //check if book is rented by that customer
                for (int i = 0; i < dbRentalHistories.Count(); i++)
                {
                    if (dbRentalHistories[i].Book.Id == BId && dbRentalHistories[i].Customer.Id == CId)
                    {
                        bookMatchCustomer = true;
                        break;
                    }
                }
            }

            if (!bookMatchCustomer)
            {
                return BadRequest("This book is not rented by this customer.");
            }
            else
            {
                var dbRentalHistory = await _context.RentalHistories
                    .Where(rh => rh.Book.Id == BId)
                    .Where(rh => rh.Customer.Id == CId)
                    .Where(rh => rh.DeliverDate == null)
                    .FirstOrDefaultAsync();
                dbRentalHistory.DeliverDate = DateTime.Now;
            }

            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpDelete("DeleteCustomer/{id}")]
        public async Task<ActionResult<List<Customer>>> DeleteCustomer(int id)
        {
            var dbCustomer = await _context.Customers.FindAsync(id);
            if (dbCustomer == null)
            {
                return BadRequest("Customer does not exist.");
            }

            _context.Customers.Remove(dbCustomer);
            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }

        
    }
}

