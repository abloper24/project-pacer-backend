// import seed data files, arrays of objects
const clientsData = require('../seed-data/clients');
const timersData = require('../seed-data/timers');

/**
 * Run seed operations for all tables.
 * @param {import("knex").Knex} knex 
 * @returns {Promise<void>}
 */
exports.seed = async function(knex) {
  // Deletes everything - needs to happen before adding anything to tables
  await knex('timers').del();
  await knex('clients').del();

  // Adds seed in order
  await knex('clients').insert(clientsData);
  await knex('timers').insert(timersData);
};
