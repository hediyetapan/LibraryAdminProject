using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryAdminAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentalHistories_Books_BookId",
                table: "RentalHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_RentalHistories_Customers_CustomerId",
                table: "RentalHistories");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerId",
                table: "RentalHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BookId",
                table: "RentalHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RentalHistories_Books_BookId",
                table: "RentalHistories",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RentalHistories_Customers_CustomerId",
                table: "RentalHistories",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentalHistories_Books_BookId",
                table: "RentalHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_RentalHistories_Customers_CustomerId",
                table: "RentalHistories");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerId",
                table: "RentalHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "BookId",
                table: "RentalHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_RentalHistories_Books_BookId",
                table: "RentalHistories",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RentalHistories_Customers_CustomerId",
                table: "RentalHistories",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id");
        }
    }
}
