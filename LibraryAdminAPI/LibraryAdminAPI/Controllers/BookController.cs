using AutoMapper;
using LibraryAdminAPI.Data;
using LibraryAdminAPI.DTOs;
using LibraryAdminAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryAdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public BookController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetBooks")]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            var dbBooks = await _context.Books
                //.Include(b => b.RentalHistories)
                .ToListAsync();

            if (dbBooks == null)
            {
                return BadRequest("Books not found.");
            }

            var bookDTOs = _mapper.Map<List<BookDTO>>(dbBooks);

            /*var bookDTOs = new List<BookDTO>();

            foreach (var book in dbBooks)
            {
                var bookDTO = new BookDTO
                {
                    Id = book.Id,
                    Name = book.Name,
                    Publisher = book.Publisher,
                    PublishYear = book.PublishYear,
                    //RentalHistories = null
                    RentalHistories = new List<RentalHistoryDTO>()
                };

                foreach(var rentalH in book.RentalHistories)
                {
                    var rentalHistoryDTO = new RentalHistoryDTO
                    {
                        Id = rentalH.Id,
                        Customer = rentalH.Customer,
                        Book = rentalH.Book,
                        rentDate = rentalH.rentDate,
                        deliverDate = rentalH.deliverDate
                    };

                    bookDTO.RentalHistories.Add(rentalHistoryDTO);
                }


                bookDTOs.Add(bookDTO);

            }*/
         

            return Ok(bookDTOs);
        }

        [HttpGet("GetWhoRentedBook")]
        public async Task<ActionResult<List<RentalHistory>>> GetWhoRentedBook(int BId)
        {
            return Ok(await _context.RentalHistories
                .Where(rh => rh.Book.Id == BId)
                .Where(rh => rh.DeliverDate == null)
                .ToListAsync());
        }

        [HttpGet("GetBookHistory")]
        public async Task<ActionResult<List<RentalHistory>>> GetBookHistory(int BId)
        {
            return Ok(await _context.RentalHistories
                .Where(rh => rh.Book.Id == BId)
                .Where(rh => rh.DeliverDate != null)
                .ToListAsync());
        }

        [HttpPost]
        [Route("AddBook")]
        public async Task<ActionResult<List<Book>>> AddBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return Ok(await _context.Books.ToListAsync());
        }

        [HttpPut]
        [Route("UpdateBook")]
        public async Task<ActionResult<List<Book>>> UpdateBook(Book book)
        {
            var dbBook = await _context.Books.FindAsync(book.Id);
            if (dbBook == null)
            {
                return BadRequest("Book does not exist.");
            }

            dbBook.Name = book.Name;
            dbBook.Publisher = book.Publisher;
            dbBook.PublishYear = book.PublishYear;

            await _context.SaveChangesAsync();

            return Ok(await _context.Books.ToListAsync());
        }

        [HttpDelete("DeleteBook/{id}")]
        public async Task<ActionResult<List<Book>>> DeleteBook(int id)
        {
            var dbBook = await _context.Books.FindAsync(id);
            if (dbBook == null)
            {
                return BadRequest("Book does not exist.");
            }

            _context.Books.Remove(dbBook);
            await _context.SaveChangesAsync();

            return Ok(await _context.Books.ToListAsync());
        }


    }
}



