const express = require("express");
const participantController = require("../controllers/participantController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/getAll", participantController.getAllParticipants);
// Register new participant
//router.post("/register", participantController.registerUser);
// Login existing participant
router.post("/login", participantController.loginUser);
// Set password for unverified participant
router.put("/set-password", participantController.setPassword);
// Fetch participant by ID
router.get("/:id", participantController.getParticipantById);


module.exports = router;
