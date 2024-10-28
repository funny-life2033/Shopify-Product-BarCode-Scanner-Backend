const express = require("express");
const {
  getDetails,
  upload,
  getProducts,
  removeProduct,
  getProduct,
  updateProduct,
  getProductStructure,
  getWholesaleTitle,
  duplicateProduct,
  getSimilarProducts,
  searchProducts,
} = require("../controllers/product");

const router = express.Router();

router.post("/details", getDetails);
router.post("/upload", upload);
router.get("/", getProducts);
router.get("/:productId", getProduct);
router.post("/update/:productId", updateProduct);
router.delete("/:productId", removeProduct);
router.post("/duplicate/:productId", duplicateProduct);
router.get("/product/getWholesaleTitle", getWholesaleTitle);
router.get("/product/structure", getProductStructure);
router.post("/product/getSimilarProducts", getSimilarProducts);
router.post("/product/searchProducts", searchProducts);

module.exports = router;
