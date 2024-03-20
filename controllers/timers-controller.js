const knex = require('knex')(require('../knexfile'));

//  all timers
const index = async (_req, res) => {
  try {
    const timers = await knex('timers');
    res.status(200).json(timers);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving timers: ${error}` });
  }
};

// find timer by ID
const findOne = async (req, res) => {
  try {
    const timer = await knex('timers').where({ timerid: req.params.id }).first();
    if (timer) {
      res.json(timer);
    } else {
      res.status(404).json({ message: `Timer with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error retrieving timer: ${error}` });
  }
};

// add a new timer
const add = async (req, res) => {
  try {
    const [newTimerId] = await knex('timers').insert(req.body);
    const newTimer = await knex('timers').where({ timerid: newTimerId }).first();
    res.status(201).json(newTimer);
  } catch (error) {
    res.status(500).json({ message: `Error creating timer: ${error}` });
  }
};

// edit/update an existing timer
const update = async (req, res) => {
  try {
    const rowsUpdated = await knex('timers').where({ timerid: req.params.id }).update(req.body);
    if (rowsUpdated) {
      const updatedTimer = await knex('timers').where({ timerid: req.params.id }).first();
      res.json(updatedTimer);
    } else {
      res.status(404).json({ message: `Timer with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating timer: ${error}` });
  }
};

// delete a timer
const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex('timers').where({ timerid: req.params.id }).del();
    if (rowsDeleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: `Timer with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error deleting timer: ${error}` });
  }
};

module.exports = {
  index,
  findOne,
  add,
  update,
  remove,
};
