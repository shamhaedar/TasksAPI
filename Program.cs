using Microsoft.EntityFrameworkCore;
using TasksAPI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TaskContext>(options =>
    options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=TasksDB;Trusted_Connection=True;"));
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.MapControllers();
app.Run();