const router = require("express").Router();
const clientController = require("../controllers/clients-controller");

router
  .route("/")
  .get(clientController.index) //checked
  .post(clientController.add); //checked

router
  .route("/:id")
  .get(clientController.findOne) //checked
  .patch(clientController.update) //checked
  .delete(clientController.remove); //checked

// Route to get invoices related to a client
router
  .route("/:id/invoices") //checked
  .get(clientController.invoices);

//router to get all entries related to one client
router
  .route("/:id/entries")
  .get(clientController.clientEntries);

module.exports = router;
