const candidateSchema = require("../models/candidate");

exports.validateCandidateAdd = (req, res, next) => {
  const { name, candidate_id } = req.body;
  if (!name || !candidate_id) {
    return res
      .status(400)
      .json({ error: "Please provide all the required fields" });
  }

  candidateSchema.findOne(
    { $or: [{ name }, { candidate_id }] },
    (err, candidate) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (candidate && candidate.name == name) {
        return res.status(400).json({ error: "Candidate name already exists" });
      }
      if (candidate_id < 1) {
        return res
          .status(400)
          .json({ error: "Candidate id must be greater than 0" });
      }
      if (candidate && candidate.candidate_id === candidate_id) {
        return res.status(400).json({ error: "Candidate id must be unique" });
      }
      next();
    }
  );
};

exports.validateCandidateEdit = (req, res, next) => {
  const { id } = req.params;
  const { name, candidate_id } = req.body;
  if (!name || !candidate_id) {
    return res
      .status(400)
      .json({ error: "Please provide all the required fields" });
  }
  candidateSchema
    .findOne({ $or: [{ name }, { candidate_id }], _id: { $ne: id } })
    .then((candidate, err) => {
      console.log(candidate);
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (candidate && candidate.name == name) {
        return res.status(400).json({ error: "Candidate name already exists" });
      }
      if (candidate_id < 1) {
        return res
          .status(400)
          .json({ error: "Candidate id must be greater than 0" });
      }
      if (candidate && candidate.candidate_id === candidate_id) {
        return res.status(400).json({ error: "Candidate id must be unique" });
      }
      next();
    });
};
