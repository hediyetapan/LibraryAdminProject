using System;
using System.Text.Json.Serialization;

namespace LibraryAdminAPI.Models
{
	public class Book
	{
		public int Id { get; set; }

		public string Name { get; set; } = string.Empty;

        public string Publisher { get; set; } = string.Empty;

        public int PublishYear { get; set; }

		public List<RentalHistory>? RentalHistories { get; set; }
	}
}

