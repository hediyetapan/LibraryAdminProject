using System.Text.Json.Serialization;
using LibraryAdminAPI.Data;
using Microsoft.EntityFrameworkCore;
using LibraryAdminAPI;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);
var mappingConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});

IMapper mapper = mappingConfig.CreateMapper();

builder.Services.AddSingleton(mapper);


builder.Services.AddControllers(opt => opt.SuppressAsyncSuffixInActionNames = false);
    /*.AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    }); ;*/
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
}
);
builder.Services.AddCors(options => options.AddPolicy(name: "LibraryOrigins",
    policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }));

//builder.Services.AddAutoMapper(typeof(MappingProfile));





var app = builder.Build();

app.UseCors("LibraryOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

