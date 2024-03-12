using System;
using LibraryAdminAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryAdminAPI.Data
{
	public class DataContext : DbContext
	{
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Customer> Customers => Set<Customer>();

        public DbSet<Book> Books => Set<Book>();

        public DbSet<RentalHistory> RentalHistories => Set<RentalHistory>();
    }
}

