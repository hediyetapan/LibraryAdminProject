using System;
using LibraryAdminAPI.Models;

namespace LibraryAdminAPI.DTOs
{
	public class RentalHistoryDTO
	{
        public int Id { get; set; }

        public Book Book { get; set; }

        public Customer Customer { get; set; }

        public DateTime RentDate { get; set; }

        public DateTime? DeliverDate { get; set; }
    }
}

