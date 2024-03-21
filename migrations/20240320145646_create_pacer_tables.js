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
      table.increments("timerid").primary();
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
    // create entries table - relational id to timer as entries can also be entered manually
    //connected to client id as well 
    .createTable("entries", table => {
      table.increments("entryid").primary();
      table.integer("timerid")
        .unsigned()
        .references("timers.timerid")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("clientid") 
        .unsigned()
        .references("clients.clientid")
        .onUpdate("CASCADE")
        .onDelete("CASCADE"); 
      table.date("date");
      table.decimal("hours", 5, 2);
      table.text("description");
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
    .dropTable("entries")
    .dropTable("timers")
    .dropTable("clients");
};
