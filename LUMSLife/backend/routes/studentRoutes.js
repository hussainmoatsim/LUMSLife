const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController.js");
router.get("/profile/editInfo", studentController.editInfo);
router.get("/profile/cv-about-me", studentController.cvAboutMe);
router.get("/profile/mySocities", studentController.getMySocities);
router.get("/profile/myApplications", studentController.getMyApplications);
module.exports = router;
