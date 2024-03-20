const router = require("express").Router();
const clientController = require("../controllers/clients-controller");

router
  .route("/")
  .get(clientController.index)
  .post(clientController.add);

router
  .route("/:id")
  .get(clientController.findOne)
  .patch(clientController.update)
  .delete(clientController.remove);

// Route to get invoices related to a client
router
  .route("/:id/invoices")
  .get(clientController.invoices);

module.exports = router;
