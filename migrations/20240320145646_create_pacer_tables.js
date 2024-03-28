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
      table.boolean("invoiced").notNullable().defaultTo(false);
      table.integer("clientid") 
        .unsigned()
        .references("clients.clientid")
        .onUpdate("CASCADE")
        .onDelete("CASCADE"); 
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("timers")
    .dropTable("clients");
};
