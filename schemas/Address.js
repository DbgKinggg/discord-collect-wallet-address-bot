const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  user: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    discriminator: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model("Address", schema);
