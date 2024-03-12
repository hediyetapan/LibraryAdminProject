﻿using System;
namespace LibraryAdminAPI.Models
{
	public class Customer
	{
		public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public List<RentalHistory>? RentalHistories { get; set; }
    }
}

