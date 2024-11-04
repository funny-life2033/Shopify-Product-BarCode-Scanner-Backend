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

(async () => {
  const all = [];
  while (true) {
    let after;
    const res = await client.query({
      data: `query {
          products(first: 250, query:"title:*Heads*"${
            after ? `, after: "${after}"` : ""
          }) {
            nodes {
              id
              title
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
    });

    all.push(...res.body.data.products.nodes);

    if (res.body.data.products.pageInfo.hasNextPage) {
      after = res.body.data.products.pageInfo.endCursor;
    } else {
      break;
    }
  }

  console.log(JSON.stringify(all, null, 2));
})();
