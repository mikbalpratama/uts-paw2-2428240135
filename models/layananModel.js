const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
      trim: true,
    },

    deskripsi: {
      type: String,
      required: true,
      trim: true,
    },

    hargaDasar: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);