const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Address", schema);
