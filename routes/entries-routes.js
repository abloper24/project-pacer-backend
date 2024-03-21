const router = require("express").Router();
const entriesController = require("../controllers/entries-controller");

router.route("/")
  .get(entriesController.index) //checked
  .post(entriesController.add); //

router.route("/:id")
  .get(entriesController.findOne) //checked
  .patch(entriesController.update) // checked but need to make sure date is entered in the right format without timezone
  .delete(entriesController.remove); //checked

module.exports = router;
