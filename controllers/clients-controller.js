const knex = require('knex')(require('../knexfile'));

//to get all clients
const index = async (_req, res) => {
  try {
    const data = await knex('clients');
    res.status(200).json(data);
  } catch(err) {
    res.status(400).send(`Error retrieving Clients: ${err}`)
  }
};
//to find only one client by ID
const findOne = async (req, res) => {
  try {
    const clientsFound = await knex("clients")
      .where({ clientid: req.params.id });

    if (clientsFound.length === 0) {
      return res.status(404).json({
        message: `Client with ID ${req.params.id} not found` 
      });
    }

    const clientData = clientsFound[0];
    res.json(clientData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve client data for client with ID ${req.params.id}`,
    });
  }
};

// Function to retrieve invoices related to a specific client
const invoices = async (req, res) => {
  try {
    const invoices = await knex("invoices")
      .where({ clientid: req.params.id });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve invoices for client with ID ${req.params.id}: ${error}`,
    });
  }
};

//function to add a new client

const add = async (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: "Please provide name and email for the client in the request",
    });
  }

  try {
    const result = await knex("clients").insert(req.body);

    const newClientId = result[0];
    const createdClient = await knex("clients").where({ clientid: newClientId });

    res.status(201).json(createdClient);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new client: ${error}`,
    });
  }
};

//edit client information
const update = async (req, res) => {
  try {
    const rowsUpdated = await knex("clients")
      .where({ clientid: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Client with ID ${req.params.id} not found` 
      });
    }

    const updatedClient = await knex("clients")
      .where({
        clientid: req.params.id,
      });
    
    res.json(updatedClient[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update client with ID ${req.params.id}: ${error}` 
    });
  }
};

//delete a client by id
const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("clients")
      .where({ clientid: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Client with ID ${req.params.id} not found` });
    }
    //no content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete client: ${error}`
    });
  }
};

module.exports = {
  index,
  findOne,
  invoices, 
  add,
  update,
  remove,
};
