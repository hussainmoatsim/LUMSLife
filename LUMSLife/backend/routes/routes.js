const express = require("express");
const router = express.Router();

const generalController = require("../controllers/generalController.js");
const studentController = require("../controllers/studentController.js");
const societyController = require("../controllers/societyController.js");
const homeFeedController = require("../controllers/homeFeedController.js");
const eventsController = require("../controllers/eventsPageController.js");

router.post("/signup", generalController.signup);
router.post("/login", generalController.login);
router.post("/validateEmail", generalController.validateEmail);
router.post("/verify-email", generalController.email_verification);

router.get("/events/info", eventsController.getEventInfo);
router.get("/events/attendance", eventsController.getEventAttendance);
router.post("/events/create", eventsController.createEvent);
router.post("/events/attend", eventsController.attendEvent);

router.get("/society/view_bookings", societyController.view_bookings);
router.put("/society/confirm_booking", societyController.confirm_booking);
router.post("/create-post", societyController.create_post);
router.get("/society/joined", societyController.getJoinedSocieties);
router.get("/society/applications", societyController.viewApplications);
router.post("/society/accept_application", societyController.acceptApplication);

router.post("/student/create_booking", studentController.bookEvent);
router.post("/student/applyForSociety", studentController.applyForSociety);
router.post("/interact-post", studentController.interact_post);

router.get("/homefeed", homeFeedController.getHomeFeed);
module.exports = router;
