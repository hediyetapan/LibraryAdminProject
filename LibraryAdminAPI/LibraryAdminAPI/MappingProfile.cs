using System;
using AutoMapper;
using LibraryAdminAPI.DTOs;
using LibraryAdminAPI.Models;

namespace LibraryAdminAPI
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<Book, BookDTO>();
		}
	}
}

