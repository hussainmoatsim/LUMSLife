const express = require("express");
const router = express.Router();

const generalController = require("../controllers/generalController.js");
const studentController = require("../controllers/studentController.js");
const societyController = require("../controllers/societyController.js");
const homeFeedController = require("../controllers/homeFeedController.js");
const eventsPageController = require("../controllers/eventsPageController.js");
const studentProfileController = require("../controllers/student_profile_backend.js");

//defining the functions to be called when a specific route is requested. note: /api/general in app.use("/api/general", router) in server file is base url for any route in this file. meaning that the signup route below is actually /api/general/signup

router.post("/signup", generalController.signup);
router.post("/login", generalController.login);
router.post("/validateEmail", generalController.validateEmail);
router.post("/verify-email", generalController.email_verification);
router.post("/search", generalController.search);
router.post("/getAccountInfo", generalController.getAccountInfo)
router.post("/deleteUserAccount", generalController.deleteUserAccount)
router.post("/updateUser", generalController.updateUser)
router.post("/adminSearch", generalController.adminSearch)



router.post('/removeSocietyAccount', societyController.removeSocietyAccount);
router.post("/create-post", societyController.create_post);

router.post('/updateSociety', societyController.updateSociety);
router.post('/getSocietyInfo', societyController.getSocietyInfo);



router.post('/removeStudentAccount', studentController.removeStudentAccount);
router.post('/updateStudent', studentController.updateStudent);
router.post('/getStudentInfo', studentController.getStudentInfo);


router.get("/homefeed", homeFeedController.getHomeFeed);
router.post("/interact-post", studentController.interact_post);
router.use("/events/info", eventsPageController);
router.use("/events/attendance", eventsPageController);
router.use("/events/create", eventsPageController);
router.use("/events/attend", eventsPageController);
router.get("/api/society/view_bookings", societyController.view_bookings);
router.put("/api/society/confirm_booking", societyController.confirm_booking);
router.post("/api/student/create_booking", studentController.bookEvent);
router.use("/api/student/profile", studentProfileController);

module.exports = router;
