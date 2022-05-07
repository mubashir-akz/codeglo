const candidateSchema = require("../../models/candidate");

exports.getCandidate = async (req, res) => {
  try {
    const candidate = await candidateSchema.find();
    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.vote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const candidate = await candidateSchema.findById({ _id: id });
    candidate.vote += 1;
    await candidate.save();
    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ error });
  }
};
