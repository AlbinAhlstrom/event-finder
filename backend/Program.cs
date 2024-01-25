using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Data;

var builder = WebApplication.CreateBuilder(args);

// Get and update connection string
var connectionString = builder.Configuration.GetConnectionString("DbConnectionString") ?? throw new InvalidOperationException("Connection string 'eventContext' not found.");

builder.Services.AddDbContext<EventContext>(options =>
    options.UseSqlServer(connectionString));

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    SeedData.Initialize(services);
}

app.UseCors(policy =>
{
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
});

app.UseHttpsRedirection();
app.UseAuthorization();

// Map routes for controllers
app.MapControllers();

// Configure fallback routing for SPA
// This assumes that your React build output is in the 'wwwroot' directory and that 'index.html' is the entry point
app.MapFallbackToFile("index.html");

app.Run();