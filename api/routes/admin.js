var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin/adminLoginController");
const adminCandidateController = require("../controllers/admin/adminCandidateController");
const candidateValidate = require("../middlewares/candidateValidation");

// login
router.get("/login", adminController.login);
router.post("/register", adminController.Register);

// candidate routes
router.get("/candidates", adminCandidateController.getCandidate);
router.post(
  "/candidates",
  candidateValidate.validateCandidateAdd,
  adminCandidateController.addCandidate
);
router.put(
  "/candidates/:id",
  candidateValidate.validateCandidateEdit,
  adminCandidateController.updateCandidate
);
router.delete("/candidates/:id", adminCandidateController.deleteCandidate);
module.exports = router;
