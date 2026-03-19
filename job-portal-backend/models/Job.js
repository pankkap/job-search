const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  salary: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isFavorite: {
  type: Boolean,
  default: false
}
});

module.exports = mongoose.model("Job", JobSchema);