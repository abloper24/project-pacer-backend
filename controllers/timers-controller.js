const knex = require('knex')(require('../knexfile'));
const { format } = require('date-fns');

// date-fns to change the format of dates
const formatDateTime = (date) => format(new Date(date), 'yyyy-MM-dd HH:mm:ss');

// get all timers entries
const index = async (_req, res) => {
  try {
    let timers = await knex('timers');
    // format dates
    timers = timers.map(timer => ({
      ...timer,
      starttime: timer.starttime ? formatDateTime(timer.starttime) : null,
      endtime: timer.endtime ? formatDateTime(timer.endtime) : null,
    }));
    res.status(200).json(timers);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving timers: ${error}` });
  }
};

// find timers by ID
const findOne = async (req, res) => {
  try {
    let timer = await knex('timers').where({ timerid: req.params.id }).first();
    if (timer) {
      timer.starttime = timer.starttime ? formatDateTime(timer.starttime) : null;
      timer.endtime = timer.endtime ? formatDateTime(timer.endtime) : null;
      res.json(timer);
    } else {
      res.status(404).json({ message: `Timer with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error retrieving timer: ${error}` });
  }
};

// add a new timers
const add = async (req, res) => {
  try {
    const [newTimerId] = await knex('timers').insert(req.body);
    let newTimer = await knex('timers').where({ timerid: newTimerId }).first();
    if (newTimer) {
      newTimer.starttime = newTimer.starttime ? formatDateTime(newTimer.starttime) : null;
      newTimer.endtime = newTimer.endtime ? formatDateTime(newTimer.endtime) : null;
      res.status(201).json(newTimer);
    } else {
      res.status(404).json({ message: "Timer not found after creation." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error creating timer: ${error}` });
  }
};

// edit/update timers
const update = async (req, res) => {
  try {
    const rowsUpdated = await knex('timers').where({ timerid: req.params.id }).update(req.body);
    if (rowsUpdated) {
      let updatedTimer = await knex('timers').where({ timerid: req.params.id }).first();
      updatedTimer.starttime = updatedTimer.starttime ? formatDateTime(updatedTimer.starttime) : null;
      updatedTimer.endtime = updatedTimer.endtime ? formatDateTime(updatedTimer.endtime) : null;
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

const markAsInvoiced = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsUpdated = await knex('timers').where({ timerid: id }).update({ invoiced: true });
    if (rowsUpdated) {
      res.json({ message: `Timer with ID ${id} marked as invoiced` });
    } else {
      res.status(404).json({ message: `Timer with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating timer: ${error}` });
  }
};

module.exports = {
  index,
  findOne,
  add,
  update,
  remove,
  markAsInvoiced,
};
