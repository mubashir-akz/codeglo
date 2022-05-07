const candidateSchema = require("../../models/candidate");

exports.addCandidate = async (req, res) => {
  const { name, candidate_id } = req.body;
  try {
    const candidate = await candidateSchema.create({
      name,
      candidate_id,
    });
    res.status(201).json({ candidate });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getCandidate = async (req, res) => {
  try {
    const candidate = await candidateSchema.find();
    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, candidate_id } = req.body;
  try {
    const candidate = await candidateSchema.findByIdAndUpdate(
      { _id: id },
      {
        name,
        candidate_id,
      },
      { new: true }
    );

    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await candidateSchema.findByIdAndDelete({ _id: id });
    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ error });
  }
};
