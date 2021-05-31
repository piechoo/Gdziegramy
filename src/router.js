const express = require("express")
const router = express.Router()
const controller = require("./controllers/controller")
const exjwt = require('express-jwt');

const jwtMW = exjwt({
    secret: 'where we play',
    algorithms: ['HS256']
});

router.post("/login", controller.LogIn)
router.get("/users",jwtMW,controller.getUsers)
router.get("/adresses",jwtMW,controller.getAdress)
router.post("/adduser", controller.AddUser)
router.post("/becomeparticipant",jwtMW, controller.becomeParticipant)

//do strzelania
router.post("/getmyevents",jwtMW, controller.getMyEvents)
router.post("/getmyeventsparticipants",jwtMW, controller.getMyEventsParticipants)
router.post("/getthiseventsparticipants",jwtMW, controller.getThisEventsParticipants)
router.get("/currentevents",jwtMW, controller.currentEvents)
router.post("/currentsportevents",jwtMW, controller.currentSportEvents)
router.post("/addcourtfrommap",jwtMW, controller.AddCourtFromMap)
router.get("/courts", jwtMW,controller.getCourts)
router.post("/sportcourts",jwtMW, controller.getSportCourts)
router.post("/becomeparticipant",jwtMW, controller.becomeParticipant)
router.post("/createdevents",jwtMW, controller.createdEvents)
router.post("/kickplayer",jwtMW, controller.kickPlayer)
router.post("/createnewevent", jwtMW,controller.AddEventFromMap)
router.post("/destroyaccount",jwtMW, controller.destroyAccount)
router.post("/ispasswordcorrect",jwtMW, controller.isPasswordCorrect)
router.post("/changepassword",jwtMW, controller.changePassword)
router.post("/changeemail",jwtMW, controller.changeEmail)
router.post("/eventsfromcourt",jwtMW, controller.getEventsFromCourt)
router.post("/markparticipants",jwtMW, controller.markParticipants)
module.exports = router