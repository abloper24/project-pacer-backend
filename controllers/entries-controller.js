const knex = require('knex')(require('../knexfile'));

//get all entries
const index = async (_req, res) => {
  try {
    const entries = await knex('entries');
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving entries: ${error}` });
  }
};

//find one entry by id
const findOne = async (req, res) => {
  try {
    const entry = await knex('entries').where({ entryid: req.params.id }).first();
    if (entry) {
      res.json(entry);
    } else {
      res.status(404).json({ message: `Entry with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error retrieving entry: ${error}` });
  }
};

//add new entry
const add = async (req, res) => {
  try {
    const [newEntryId] = await knex('entries').insert(req.body);
    const newEntry = await knex('entries').where({ entryid: newEntryId }).first();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: `Error creating entry: ${error}` });
  }
};

//update/entry
const update = async (req, res) => {
  try {
    const rowsUpdated = await knex('entries').where({ entryid: req.params.id }).update(req.body);
    if (rowsUpdated) {
      const updatedEntry = await knex('entries').where({ entryid: req.params.id }).first();
      res.json(updatedEntry);
    } else {
      res.status(404).json({ message: `Entry with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating entry: ${error}` });
  }
};

//remove entry
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

//find entry by timer id
const findByTimer = async (req, res) => {
    try {
      const { timerid } = req.params;
      const entries = await knex('entries').where({ timerid });
  
      if (entries.length === 0) {
        return res.status(404).json({ message: `No entries found for timer ID ${timerid}` });
      }
  
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: `Error retrieving entries for timer ID ${timerid}: ${error}` });
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
