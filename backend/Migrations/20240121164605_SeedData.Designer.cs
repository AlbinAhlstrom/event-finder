﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(EventContext))]
    [Migration("20240121164605_SeedData")]
    partial class SeedData
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Models.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Venue")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Events");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Strandvägen 1, 114 51 Stockholm, Sweden",
                            Category = "Music",
                            Description = "Delight in the melodic tunes of live jazz as you watch the sunset by the waterfront.",
                            Duration = 2,
                            Latitude = 59.330680000000001,
                            Longitude = 18.076219999999999,
                            Price = 220.00m,
                            StartTime = new DateTime(2024, 1, 19, 17, 0, 0, 0, DateTimeKind.Local),
                            Title = "Jazz by the Waterfront",
                            Venue = "Waterfront Stage"
                        },
                        new
                        {
                            Id = 2,
                            Address = "Djurgårdsvägen 6-16, 115 21 Stockholm, Sweden",
                            Category = "Sports",
                            Description = "Get your sneakers ready for a family-friendly 5k run around the scenic Djurgården!",
                            Duration = 2,
                            Latitude = 59.325116999999999,
                            Longitude = 18.103895999999999,
                            Price = 100.00m,
                            StartTime = new DateTime(2024, 1, 20, 9, 0, 0, 0, DateTimeKind.Local),
                            Title = "Family Fun Run",
                            Venue = "Djurgården Run Trail"
                        },
                        new
                        {
                            Id = 3,
                            Address = "Nybroplan, 111 47 Stockholm, Sweden",
                            Category = "Arts",
                            Description = "Witness one of the most enchanting winter plays by Shakespeare at the Royal Dramatic Theatre.",
                            Duration = 2,
                            Latitude = 59.330922999999999,
                            Longitude = 18.076841999999999,
                            Price = 350.00m,
                            StartTime = new DateTime(2024, 1, 20, 16, 30, 0, 0, DateTimeKind.Local),
                            Title = "The Winter's Tale",
                            Venue = "The Royal Dramatic Theatre"
                        },
                        new
                        {
                            Id = 4,
                            Address = "Södermalmstorg 4, 116 45 Stockholm, Sweden",
                            Category = "Family",
                            Description = "A fun and interactive art workshop for children aged 5-10, exploring painting and sculpture.",
                            Duration = 2,
                            Latitude = 59.319882,
                            Longitude = 18.071957000000001,
                            Price = 150.00m,
                            StartTime = new DateTime(2024, 1, 21, 11, 0, 0, 0, DateTimeKind.Local),
                            Title = "Children's Art Workshop",
                            Venue = "Stockholm Art Hub"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
