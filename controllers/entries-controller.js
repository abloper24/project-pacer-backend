const knex = require('knex')(require('../knexfile'));
const { format } = require('date-fns');

// format dates
const formatDateTime = (date) => format(new Date(date), 'yyyy-MM-dd HH:mm:ss');

// get all entries
const index = async (_req, res) => {
  try {
    let entries = await knex('entries');

    entries = entries.map(entry => ({
      ...entry,
      date: entry.date ? formatDateTime(entry.date) : null,
    }));
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving entries: ${error}` });
  }
};

// find entry by id
const findOne = async (req, res) => {
  try {
    let entry = await knex('entries').where({ entryid: req.params.id }).first();
    if (entry) {
      
      entry.date = entry.date ? formatDateTime(entry.date) : null;
      res.json(entry);
    } else {
      res.status(404).json({ message: `Entry with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error retrieving entry: ${error}` });
  }
};

// add NEW entry
const add = async (req, res) => {
  try {
    const [newEntryId] = await knex('entries').insert(req.body);
    let newEntry = await knex('entries').where({ entryid: newEntryId }).first();
   
    if (newEntry) {
      newEntry.date = newEntry.date ? formatDateTime(newEntry.date) : null;
      res.status(201).json(newEntry);
    } else {
      res.status(404).json({ message: "Entry not found after creation." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error creating entry: ${error}` });
  }
};

// edit/update existing entry
const update = async (req, res) => {
  try {
    const rowsUpdated = await knex('entries').where({ entryid: req.params.id }).update(req.body);
    if (rowsUpdated) {
      let updatedEntry = await knex('entries').where({ entryid: req.params.id }).first();

      updatedEntry.date = updatedEntry.date ? formatDateTime(updatedEntry.date) : null;
      res.json(updatedEntry);
    } else {
      res.status(404).json({ message: `Entry with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating entry: ${error}` });
  }
};

// delete entry
const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex('entries').where({ entryid: req.params.id }).del();
    if (rowsDeleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: `Entry with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error deleting entry: ${error}` });
  }
};

// get entries by timer ID - not sure if i will be using this one or if it should be the other way around 
//will comeback when frontend is done
const findByTimer = async (req, res) => {
  try {
    let entries = await knex('entries').where({ timerid: req.params.timerid });
  
    entries = entries.map(entry => ({
      ...entry,
      date: entry.date ? formatDateTime(entry.date) : null,
    }));
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving entries for timer ID ${req.params.timerid}: ${error}` });
  }
};

module.exports = {
  index,
  findOne,
  add,
  update,
  remove,
  findByTimer,
};
