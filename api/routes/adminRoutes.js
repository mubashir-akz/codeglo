const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin/adminLoginController");
const adminCandidateController = require("../controllers/admin/adminCandidateController");
const candidateValidate = require("../middlewares/candidateValidation");
const checkAuth = require("../middlewares/check-auth");

// login
router.get("/login", adminController.login);
router.post("/register", adminController.Register);

// candidate routes
router.get("/candidates", checkAuth, adminCandidateController.getCandidate);
router.post(
  "/candidates",
  checkAuth,
  candidateValidate.validateCandidateAdd,
  adminCandidateController.addCandidate
);
router.put(
  "/candidates/:id",
  checkAuth,
  candidateValidate.validateCandidateEdit,
  adminCandidateController.updateCandidate
);
router.delete(
  "/candidates/:id",
  checkAuth,
  adminCandidateController.deleteCandidate
);
module.exports = router;
