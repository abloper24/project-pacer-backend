const router = require("express").Router();
const entriesController = require("../controllers/entries-controller");

router.route("/")
  .get(entriesController.index)
  .post(entriesController.add);

router.route("/:id")
  .get(entriesController.findOne)
  .patch(entriesController.update)
  .delete(entriesController.remove);


router.route("/entry-by-timer/:timerid")
  .get(entriesController.findByTimer);

module.exports = router;
