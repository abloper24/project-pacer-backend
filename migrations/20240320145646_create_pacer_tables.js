/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    // create clients first - as it's needed by invoices for foreign key
    .createTable("clients", table => {
      table.increments("clientid").primary();
      table.string("name").notNullable();
      table.string("email");
      table.text("address");
      table.string("phone");
    })
    // create timers table 
    //added client id connection
    .createTable("timers", table => {
      table.increments("timerid").primary(); //this would be a text parameter 
      table.datetime("starttime");
      table.datetime("endtime");
      table.integer("duration");
      table.text("description");
      table.integer("clientid") 
        .unsigned()
        .references("clients.clientid")
        .onUpdate("CASCADE")
        .onDelete("CASCADE"); 
    })
    // create invoices table last - relational id to client as it needs to have client data
    .createTable("invoices", table => {
      table.increments("invoiceid").primary();
      table.integer("clientid")
        .unsigned()
        .references("clients.clientid")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.date("issuedate");
      table.date("duedate");
      table.decimal("totalamount", 10, 2);
      table.string("status");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("invoices")
    .dropTable("timers")
    .dropTable("clients");
};
