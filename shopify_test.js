const Shopify = require("shopify-api-node");
require("dotenv").config();

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  accessToken: process.env.SHOPIFY_API_TOKEN,
});

shopify.product
  .list({ fields: "id", since_id: "9555053314330" })
  .then((res) => console.log("res: ", res, res.length))
  .catch((err) => console.log("err: ", err));
