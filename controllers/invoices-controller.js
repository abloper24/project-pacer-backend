const knex = require('knex')(require('../knexfile'));
const { format } = require('date-fns');

// format dates
const formatDateTime = (date) => format(new Date(date), 'yyyy-MM-dd HH:mm:ss');

// find all invoices
const index = async (_req, res) => {
  try {
    let invoices = await knex('invoices');
   
    invoices = invoices.map(invoice => ({
      ...invoice,
      issuedate: invoice.issuedate ? formatDateTime(invoice.issuedate) : null,
      duedate: invoice.duedate ? formatDateTime(invoice.duedate) : null,
    }));
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving invoices: ${error}` });
  }
};

// find invoice by id
const findOne = async (req, res) => {
  try {
    let invoice = await knex('invoices').where({ invoiceid: req.params.id }).first();
    if (invoice) {
      
      invoice.issuedate = invoice.issuedate ? formatDateTime(invoice.issuedate) : null;
      invoice.duedate = invoice.duedate ? formatDateTime(invoice.duedate) : null;
      res.json(invoice);
    } else {
      res.status(404).json({ message: `Invoice with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error retrieving invoice: ${error}` });
  }
};

// add new invoice
const add = async (req, res) => {
  try {
    const [newInvoiceId] = await knex('invoices').insert(req.body);
    let newInvoice = await knex('invoices').where({ invoiceid: newInvoiceId }).first();
  
    if (newInvoice) {
      newInvoice.issuedate = newInvoice.issuedate ? formatDateTime(newInvoice.issuedate) : null;
      newInvoice.duedate = newInvoice.duedate ? formatDateTime(newInvoice.duedate) : null;
      res.status(201).json(newInvoice);
    } else {
      res.status(404).json({ message: "Invoice not found after creation." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error creating invoice: ${error}` });
  }
};

// edit/update invoice 
const update = async (req, res) => {
  try {
    const rowsUpdated = await knex('invoices').where({ invoiceid: req.params.id }).update(req.body);
    if (rowsUpdated) {
      let updatedInvoice = await knex('invoices').where({ invoiceid: req.params.id }).first();
      
      updatedInvoice.issuedate = updatedInvoice.issuedate ? formatDateTime(updatedInvoice.issuedate) : null;
      updatedInvoice.duedate = updatedInvoice.duedate ? formatDateTime(updatedInvoice.duedate) : null;
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: `Invoice with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating invoice: ${error}` });
  }
};

// delete invoice
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
