const router = require("express").Router();
const invoiceController = require("../controllers/invoices-controller"); 

router.route("/")
  .get(invoiceController.index) //checked
  .post(invoiceController.add); //checked

router.route("/:id")
  .get(invoiceController.findOne) //checked
  .patch(invoiceController.update) //checked
  .delete(invoiceController.remove); //checked

module.exports = router;
