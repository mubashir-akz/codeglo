const candidateSchema = require("../../models/Candidate");
const usersSchema = require("../../models/Users");

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
  const { userId } = req.userData; // userId is the id of the user that is logged in
  try {
    // check if user has already voted
    const user = await usersSchema.findOne({ _id: userId });
    if (user.voted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    const candidate = await candidateSchema.findById({ _id: id });
    candidate.vote += 1;
    await candidate.save();

    // update user voted to true
    await usersSchema.updateOne({ _id: userId }, { $set: { voted: true } });
    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ error });
  }
};
