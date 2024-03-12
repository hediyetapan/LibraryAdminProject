using System;
using LibraryAdminAPI.Models;

namespace LibraryAdminAPI.DTOs
{
	public class CustomerDTO
	{
		public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public List<RentalHistory> RentalHistories { get; set; }
    }
}

