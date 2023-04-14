const express = require("express");
const router = express.Router();

const societyController = require("../controllers/societyController.js");

router.post("/event/create-post", societyController.create_post);
router.get("/event/info", societyController.getEventInfo);
router.get("/event/attendance", societyController.getEventAttendance);
module.exports = router;
