const router = require("express").Router();
const invoiceController = require("../controllers/invoices-controller"); 

router.route("/")
  .get(invoiceController.index)
  .post(invoiceController.add);

router.route("/:id")
  .get(invoiceController.findOne)
  .patch(invoiceController.update)
  .delete(invoiceController.remove);

module.exports = router;
