using System;
using LibraryAdminAPI.Models;

namespace LibraryAdminAPI.DTOs
{
	public class BookDTO
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public string Publisher { get; set; }

		public int PublishYear { get; set; }

        public List<RentalHistoryDTO>? RentalHistories { get; set; }

        
    }
}

