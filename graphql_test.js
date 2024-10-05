const { shopifyApi } = require("@shopify/shopify-api");
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
        node(id: "gid://shopify/Product/9617006690586") {
            ... on Product {
                metafield(namespace: "custom", key: "title") {
                    id
                }
            }
        }
    }`,
  })
  .then((res) => console.log(res.body.data))
  .catch((err) => console.log(err));
