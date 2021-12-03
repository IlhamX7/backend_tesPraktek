const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    fotoBarang: {
      type: String,
      default: "",
    },
    namaBarang: {
      type: String,
      required: true,
    },
    hargaBeli: {
      type: Number,
      default: 0,
    },
    hargaJual: {
      type: Number,
      default: 0,
    },
    stok: {
        type: Number,
        default: 0,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
