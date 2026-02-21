const express = require("express");
const deliverableController = require("../controllers/deliverableController"); // Import the deliverable controller
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/getAll", auth("admin"), deliverableController.getAllDeliverables);
router.get("/:id", auth("admin"), deliverableController.getDeliverableById);
router.post("/", deliverableController.createDeliverable);
router.put("/:id", deliverableController.updateDeliverableById);
router.delete("/:id", deliverableController.deleteDeliverableById);

router.get(
  "/team/:team_id/task/:task_id", auth("admin"),
  deliverableController.getDeliverableByTeamAndTask
);

module.exports = router;
