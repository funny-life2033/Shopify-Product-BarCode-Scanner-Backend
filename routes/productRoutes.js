const express = require("express");
const {
  getDetails,
  upload,
  getProducts,
  removeProduct,
  getProduct,
  updateProduct,
  getProductStructure,
} = require("../controllers/product");

const router = express.Router();

router.post("/details", getDetails);
router.post("/upload", upload);
router.get("/", getProducts);
router.get("/:productId", getProduct);
router.get("/product/structure", getProductStructure);
router.post("/update/:productId", updateProduct);
router.delete("/:productId", removeProduct);

module.exports = router;
