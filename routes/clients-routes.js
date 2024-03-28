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

//router to get all entries related to one client
router
  .route("/:id/timers")
  .get(clientController.clientTimers);

module.exports = router;
