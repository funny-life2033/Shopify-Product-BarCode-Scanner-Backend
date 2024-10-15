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
  while (true) {
    let after;
    const res = await client.query({
      data: `query {
          products(first: 250${after ? `, after: "${after}"` : ""}) {
            nodes {
              id
              variants(first: 1) {
                nodes {
                  id
                  barcode
                }
              }
              metafield(namespace: "custom", key: "upc_") {
                key
                value
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
    });

    for (let product of res.body.data.products.nodes) {
      if (
        product.metafield &&
        product.metafield.key === "upc_" &&
        product.metafield.value &&
        product.metafield.value !== "" &&
        product.variants.nodes.length &&
        product.variants.nodes[0].barcode !== product.metafield.value
      ) {
        await client.query({
          data: {
            query: `mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkUpdate(productId: $productId, variants: $variants) {
    userErrors {
      field
      message
    }
  }
}`,
            variables: {
              productId: product.id,
              variants: [
                {
                  id: product.variants.nodes[0].id,
                  barcode: product.metafield.value,
                },
              ],
            },
          },
        });
      }
    }
    if (res.body.data.products.pageInfo.hasNextPage) {
      after = res.body.data.products.pageInfo.endCursor;
    } else {
      break;
    }
  }
})();
