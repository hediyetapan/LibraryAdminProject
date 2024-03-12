using System;
using System.Text.Json.Serialization;

namespace LibraryAdminAPI.Models
{
	public class RentalHistory
	{
		public int Id { get; set;}

		public int BookId { get; set; }

        public int CustomerId { get; set; }
        [JsonIgnore]
		public Book Book { get; set; } = new Book();
		[JsonIgnore]
		public Customer Customer { get; set; } = new Customer();

		public DateTime RentDate { get; set; }

        public DateTime? DeliverDate { get; set; }
    }
}

