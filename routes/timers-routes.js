const router = require("express").Router();
const timerController = require("../controllers/timers-controller");

// get all timers
router.route("/")
  .get(timerController.index)
  .post(timerController.add);

// timer by ID
router.route("/:id")
  .get(timerController.findOne)
  .patch(timerController.update)
  .delete(timerController.remove);

module.exports = router;
