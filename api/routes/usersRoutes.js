const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user/usersController");
const usersVotingController = require("../controllers/user/usersVotingController");

const checkAuth = require("../middlewares/check-auth");

// login
router.get("/login", usersController.login);
router.post("/register", usersController.Register);

// voting
router.get("/candidate", checkAuth, usersVotingController.getCandidate);
// users voting api
router.put("/vote/:id", checkAuth, usersVotingController.vote);

module.exports = router;
