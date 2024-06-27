using Microsoft.EntityFrameworkCore;
using Persona.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//CORS
builder.Services.AddCors(options=>options.AddPolicy("Allowedapp",builder=>builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

//Add Context
builder.Services.AddDbContext<AplicationDbContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"));
});

//AUTOMAPPER
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Allowedapp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
