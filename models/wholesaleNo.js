const mongoose = require("mongoose");

const wholesaleNoSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: true,
  },
});

const WholesaleNo = mongoose.model("wholesaleNo", wholesaleNoSchema);
module.exports = WholesaleNo;
