const express = require("express")
const router = express.Router()
const controller = require("./controllers/controller")

router.get("/", controller.renderLoginPage)
router.post("/auth", controller.LogIn)
router.get("/home", controller.renderHome)
router.get("/courts", controller.getCourts)
router.get("/users",controller.getUsers)
router.get("/adresses",controller.getAdress)

router.get("/adduser", controller.renderAddUser)
router.post("/addeduser", controller.AddUser)

router.get("/addcourt", controller.renderAddCourt)
router.post("/addedcourt", controller.AddCourt)

router.get("/addevent", controller.renderAddEvent)
router.post("/addedevent", controller.AddEvent)
router.get("/logout", controller.LogOut)


module.exports = router