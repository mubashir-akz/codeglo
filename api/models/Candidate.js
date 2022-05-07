const mongoose = require("mongoose");

const { Schema } = mongoose;

const candidateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    candidate_id: {
      type: Number,
      default: 0,
      autoIncrement: true,
    },
    vote: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// candidateSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("candidate", candidateSchema);
