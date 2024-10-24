const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  updatedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  discogsId: {
    type: String,
  },
});

const Products = mongoose.model("products", productsSchema);
module.exports = Products;
