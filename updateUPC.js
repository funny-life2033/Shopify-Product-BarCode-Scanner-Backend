const { shopifyApi } = require("@shopify/shopify-api");
const { sleep } = require("./config/utils");
const Shopify = require("shopify-api-node");

require("@shopify/shopify-api/adapters/node");

require("dotenv").config();

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  accessToken: process.env.SHOPIFY_API_TOKEN,
});

const shopifyGraphql = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
  adminApiAccessToken: process.env.SHOPIFY_API_TOKEN,
  hostName: `${process.env.SHOP_NAME}.myshopify.com`,
  isCustomStoreApp: true,
  scopes: ["read_products", "write_products", "read_inventory"],
});

const session = shopifyGraphql.session.customAppSession(
  `${process.env.SHOP_NAME}.myshopify.com`
);

const shopifyClient = new shopifyGraphql.clients.Graphql({
  session,
});

(async () => {
  let after;

  while (true) {
    try {
      const res = await shopifyClient.query({
        data: `query {
                  products(first: 250${after ? `, after: "${after}"` : ""}) {
                    edges {
                      node {
                        id
                        variants(first: 1) {
                            nodes {
                                id
                                barcode
                            }
                        }
                        metafield(key: "custom.upc_") {
                          value
                        }
                      }
                    }
                    pageInfo {
                      hasNextPage
                      endCursor
                    }
                  }
                }`,
      });

      for (const { node } of res.body.data.products.edges) {
        if (
          node.metafield &&
          node.metafield.value &&
          node.metafield.value !== "" &&
          (!node.variants.nodes[0].barcode ||
            node.variants.nodes[0].barcode === "")
        ) {
          console.log(JSON.stringify(node, null, 2));
          await shopify.productVariant.update(
            node.variants.nodes[0].id.split("gid://shopify/ProductVariant/")[1],
            { barcode: node.metafield.value }
          );
        }
      }

      if (res.body.data.products.pageInfo.hasNextPage) {
        after = res.body.data.products.pageInfo.endCursor;
      } else {
        break;
      }
    } catch (error) {
      console.log("getting products error:", error);
      await sleep(30000);
    }
  }
})();
