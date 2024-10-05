const Shopify = require("shopify-api-node");
require("dotenv").config();

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  accessToken: process.env.SHOPIFY_API_TOKEN,
});

const sleep = async (time) =>
  new Promise((res) => setInterval(() => res(), time));

const getAllProducts = async () => {
  let page_info;
  let products = [];
  while (true) {
    let newProducts;
    while (true) {
      try {
        newProducts = await shopify.product.list({
          fields: "id",
          limit: 250,
          page_info,
        });
        break;
      } catch (error) {
        await sleep(3000);
      }
    }
    products = products.concat(newProducts);
    if (!newProducts.nextPageParameters) break;
    page_info = newProducts.nextPageParameters.page_info;
  }

  return products;
};

const getMetafields = async (productId) => {
  while (true) {
    try {
      let metafields = await shopify.metafield.list({
        metafield: { owner_resource: "product", owner_id: productId },
      });
      let condition;
      let vinyl_grade;
      for (let field of metafields) {
        if (field.key === "condition") {
          condition = field;
        } else if (field.key === "vinyl_grade") {
          vinyl_grade = field;
        }
      }

      return { condition, vinyl_grade };
    } catch (error) {}
    await sleep(3000);
  }
};

const updateConditionMetafield = async ({
  condition,
  vinyl_grade,
  product_id,
}) => {
  let value = "Used";
  if (vinyl_grade) {
    let values = JSON.parse(vinyl_grade.value) || [];
    if (values.includes("Sealed") || values.includes("New")) value = "New";
  }

  if (condition && condition.value === value) return;
  if (condition) {
    while (true) {
      try {
        await shopify.metafield.update(condition.id, { value });
        break;
      } catch (error) {
        await sleep(3000);
      }
    }
  } else {
    while (true) {
      try {
        await shopify.metafield.create({
          owner_id: product_id,
          owner_resource: "product",
          key: "condition",
          value,
          type: "single_line_text_field",
          namespace: "custom",
        });
        break;
      } catch (error) {
        await sleep(3000);
      }
    }
  }
};

const start = async () => {
  const products = await getAllProducts();
  for (let product of products) {
    let metafields = await getMetafields(product.id);
    await updateConditionMetafield({ ...metafields, product_id: product.id });
    console.log(product.id, "is updated");
    await sleep(100);
  }
};

start();
