const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');

const PORT = process.env.PORT || 8080;

// import all routes here
const clientsRoutes = require('./routes/clients-routes');
const timersRoutes = require('./routes/timers-routes');

//make sure to include cors
app.use(express.json());
app.use(cors()); 


// all routes should go here
app.use("/clients", clientsRoutes);
app.use("/timers", timersRoutes);

app.listen(PORT, () => {
  console.log(`We are live on port http://localhost:${PORT}`);
});
