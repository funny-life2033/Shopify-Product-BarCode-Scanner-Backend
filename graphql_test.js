const { shopifyApi } = require("@shopify/shopify-api");
const details = require("./config/details");
require("@shopify/shopify-api/adapters/node");
require("dotenv").config();

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
  adminApiAccessToken: process.env.SHOPIFY_API_TOKEN,
  hostName: `${process.env.SHOP_NAME}.myshopify.com`,
  isCustomStoreApp: true,
  scopes: ["read_products", "write_products"],
});

const session = shopify.session.customAppSession(
  `${process.env.SHOP_NAME}.myshopify.com`
);

const client = new shopify.clients.Graphql({
  session,
});

client
  .query({
    data: `query {
      products(first: 5) {
        edges {
          node {
            title
            metafields(first: 1, keys: ["custom.upc_"]) {
             nodes {
              key
              value
             }
            }
          }
        }
      }
    }`,
  })
  .then((res) => console.log(JSON.stringify(res.body.data, null, 2)))
  .catch((err) => console.log(err));
