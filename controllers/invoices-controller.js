const knex = require('knex')(require('../knexfile'));

//find all invoices
const index = async (_req, res) => {
  try {
    const invoices = await knex('invoices');
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving invoices: ${error}` });
  }
};

//find one invoice by id
const findOne = async (req, res) => {
  try {
    const invoice = await knex('invoices').where({ invoiceid: req.params.id }).first();
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ message: `Invoice with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error retrieving invoice: ${error}` });
  }
};

//add new invoice
const add = async (req, res) => {
  try {
    const [newInvoiceId] = await knex('invoices').insert(req.body);
    const newInvoice = await knex('invoices').where({ invoiceid: newInvoiceId }).first();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: `Error creating invoice: ${error}` });
  }
};

//edit/update invoice by id
const update = async (req, res) => {
  try {
    const rowsUpdated = await knex('invoices').where({ invoiceid: req.params.id }).update(req.body);
    if (rowsUpdated) {
      const updatedInvoice = await knex('invoices').where({ invoiceid: req.params.id }).first();
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: `Invoice with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating invoice: ${error}` });
  }
};


//delete invoice by id
const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex('invoices').where({ invoiceid: req.params.id }).del();
    if (rowsDeleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: `Invoice with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error deleting invoice: ${error}` });
  }
};

module.exports = {
  index,
  findOne,
  add,
  update,
  remove,
};
