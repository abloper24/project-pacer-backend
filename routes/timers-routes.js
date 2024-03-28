const router = require("express").Router();
const timerController = require("../controllers/timers-controller");

// get all timers
router.route("/")
  .get(timerController.index) //checked
  .post(timerController.add); //checked added id 10 and 11

// timer by ID
router.route("/:id")
  .get(timerController.findOne) //checked
  .patch(timerController.update) //checked fixed timerid 9 
  .delete(timerController.remove); //checked deleted timerid11

router.route("/:id/invoiced")
  .patch(timerController.markAsInvoiced);

module.exports = router;
