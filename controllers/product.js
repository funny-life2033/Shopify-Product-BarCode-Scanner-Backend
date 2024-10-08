const axios = require("axios");
const detailFields = require("../config/details");
const Shopify = require("shopify-api-node");
const { shopifyApi } = require("@shopify/shopify-api");
const jwt = require("jsonwebtoken");
const Product = require("../models/products");
const User = require("../models/users");
const WholesaleNo = require("../models/wholesaleNo");
const { sleep } = require("../config/utils");
// const fs = require("fs");
// const path = require("path");
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
  scopes: ["read_products", "write_products"],
});

const session = shopifyGraphql.session.customAppSession(
  `${process.env.SHOP_NAME}.myshopify.com`
);

const shopifyClient = new shopifyGraphql.clients.Graphql({
  session,
});

const saveNewWholesale = async () => {
  const [no] = await WholesaleNo.find({});
  let wholesaleTitle;
  if (no) {
    wholesaleTitle = `Lot #${(no.no + 1).toString().padStart(5, "0")}`;
    await WholesaleNo.findByIdAndUpdate(no.id, { no: no.no + 1 });
  } else {
    wholesaleTitle = "Lot #00071";
    await WholesaleNo.create({ no: 71 });
  }

  return wholesaleTitle;
};

const getDetails = async (req, res) => {
  const { upc } = req.body;
  if (!upc) return res.status(400).json({ message: "Incorrect UPC" });

  try {
    const { data } = await axios.default.get(
      `https://api.discogs.com/database/search?barcode=${upc}`,
      {
        headers: {
          Authorization: `Discogs token=${process.env.DISCOGS_API_TOKEN}`,
        },
      }
    );

    if (!data.results) {
      return res.status(500).json({ message: "Server error!" });
    }

    if (data.results.length === 0) {
      return res.status(400).json({ message: "Incorrect UPC!" });
    }

    let productDetails = data.results.map((result) => {
      let [artist, title] = result["title"].split(" - ");
      let images = [{ src: result["cover_image"] }];
      let genre_ = result["genre"].map((genre) =>
        genre === "Rock" || genre === "Pop" ? "Rock & Pop" : genre
      );
      let release_year = result["year"];
      let record_label = result["label"];
      let vendor = result["label"];
      let product_type = result["format"].map((format) =>
        format === "DVD" ? "DVDs" : format === "CD" ? "CDs" : format
      );
      let country_of_manufacture = result["country"];
      let catalog = result["catno"];

      let filteredData = {
        artist,
        images,
        title: "",
        product_title: title,
        upc_: upc,
        vendor,
        genre_,
        release_year,
        record_label,
        product_type,
        country_of_manufacture,
        catalog,
      };
      let details = {};

      for (let field of detailFields) {
        details[field.name] = { ...field };

        if (Array.isArray(filteredData[field.name])) {
          if (!field.options) {
            if (field.isMultiSelect)
              details[field.name]["value"] = filteredData[field.name];
            else
              details[field.name]["value"] = filteredData[field.name][0] || "";
          } else {
            if (field.isMultiSelect)
              details[field.name]["value"] = filteredData[field.name].filter(
                (value) => {
                  return field.options.includes(value);
                }
              );
            else
              details[field.name]["value"] =
                filteredData[field.name].find((value) => {
                  return field.options.includes(value);
                }) || "";
          }
        } else {
          if (!field.options) {
            if (field.isMultiSelect) {
              if (filteredData[field.name])
                details[field.name]["value"] = [filteredData[field.name]];
              else details[field.name]["value"] = [];
            } else
              details[field.name]["value"] = filteredData[field.name] || "";
          } else {
            let value = field.options.find(
              (option) => option === filteredData[field.name]
            );
            if (field.isMultiSelect)
              details[field.name]["value"] = value ? [value] : [];
            else details[field.name]["value"] = value || "";
          }
        }
      }

      details["id"] = result["id"];

      return details;
    });

    return res.json({
      message: "Successed in getting product details!",
      productDetails,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const upload = async (req, res) => {
  const productDetailsList = req.body;
  // console.log(JSON.stringify(productDetailsList, null, 2));
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret");
  let user = await User.findOne({ username: decodedToken?.username });

  let successed = [];
  let failed = [];

  for (let details of productDetailsList) {
    let creatingData = {
      metafields: [
        {
          key: "uploaded_by",
          value: user.username,
          type: "single_line_text_field",
          namespace: "custom",
        },
      ],
      variants: [
        {
          inventory_management: "shopify",
        },
      ],
    };

    let wholesaleTitle;

    if (details["product_type"]["value"] === "Wholesale") {
      wholesaleTitle = await saveNewWholesale();
    }

    for (let field of detailFields) {
      let value = details[field.name]["value"];

      if (
        details["product_type"]["value"] === "Wholesale" &&
        field.key === "lot_"
      ) {
        value = wholesaleTitle;
      }
      if (value) {
        if (Array.isArray(value)) {
          value = value.filter((value) => value && value !== "");
          value = JSON.stringify(value);
        }
        if (field["isMetafield"]) {
          creatingData["metafields"] = [
            ...creatingData["metafields"],
            {
              key: details[field.name]["key"],
              value,
              type: details[field.name]["type"],
              namespace: "custom",
            },
          ];
        } else if (field["isVariants"]) {
          creatingData["variants"][0][field.name] =
            details[field.name]["value"];
        } else if (field["key"] === "tags") {
          if (Array.isArray(details[field.name]["value"]))
            creatingData[field.name] = details[field.name]["value"].join(", ");
          else creatingData[field.name] = "";
        } else {
          creatingData[field.name] = details[field.name]["value"];
        }
      }
    }

    try {
      const response = await shopify.product.create(creatingData);
      await Product.create({
        productId: response.id,
        discogsId: details.id,
        uploadedBy: user._id,
      });
      successed.push({ discogsId: details.id, id: response.id });
      // fs.writeFileSync(
      //   path.join(__dirname, "creating data"),
      //   JSON.stringify(creatingData, null, 2),
      //   "utf8"
      // );
    } catch (error) {
      console.log("error: ", error);
      failed.push({ discogsId: details.id });
    }
  }

  return res.json({
    message: `${successed.length} products have been successfully uploaded!`,
    successed,
    failed,
  });
};

const updateProductOld = async (req, res) => {
  const productId = req.params.productId;
  const { key, detail } = req.body;

  let updatingData = {
    variants: [{ inventory_management: "shopify" }],
  };
  try {
    let variants = (await shopify.product.get(productId, "variants"))[
      "variants"
    ][0];

    for (let field of detailFields) {
      if (field.isVariants) {
        updatingData.variants[0][field.name] = variants[field.key];
      }
    }
  } catch (error) {}

  let metafield = null;

  detailFields.forEach((field) => {
    if (field.name === key) {
      let value = detail["value"];
      if (Array.isArray(value)) {
        value = value.filter((value) => value && value !== "");
        value = JSON.stringify(value);
      }
      if (field["isMetafield"]) {
        metafield = {
          value: value,
          id: detail["id"],
          product_id: productId,
          type: detail["type"],
          key: field.key,
        };
      } else if (field["isVariants"]) {
        updatingData["variants"][0][field.name] = detail["value"];
      } else if (field.name === "images") {
        updatingData[field.name] = detail["value"].map((image, index) =>
          image["id"]
            ? { id: image["id"], position: index + 1 }
            : { ...image, position: index + 1 }
        );
      } else {
        updatingData[field.name] = detail["value"];
      }
    }
  });

  try {
    if (metafield) {
      if (metafield.id) {
        await shopify.metafield.update(metafield.id, {
          value: metafield.value,
        });
      } else {
        await shopify.metafield.create({
          owner_id: metafield.product_id,
          owner_resource: "product",
          key: metafield.key,
          value: metafield.value,
          type: metafield.type,
          namespace: "custom",
        });
      }
    } else {
      await shopify.product.update(productId, updatingData);
    }

    return res.json({ message: "Successfully updated!" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { productDetails } = req.body;

  let updatingData = {
    variants: [{ inventory_management: "shopify" }],
  };
  while (true) {
    try {
      let variants = (await shopify.product.get(productId, "variants"))[
        "variants"
      ][0];

      for (let field of detailFields) {
        if (field.isVariants) {
          updatingData.variants[0][field.name] = variants[field.key];
        }
      }
      break;
    } catch (error) {}
    await sleep(1000);
  }
  let metafields = [];
  let deletingMetafields = [];

  for (let field of detailFields) {
    if (field["isMetafield"]) {
      let value = productDetails[field.name]["value"];
      if (Array.isArray(value)) {
        value = value.filter((value) => value && value !== "");
        value = JSON.stringify(value);
      }
      if (
        productDetails["product_type"]["value"] === "Wholesale" &&
        field.key === "lot_"
      ) {
        value = await saveNewWholesale();
      }
      if (value && value !== "") {
        metafields.push({
          id: productDetails[field.name]["id"]
            ? `gid://shopify/Metafield/${productDetails[field.name]["id"]}`
            : undefined,
          key: field.key,
          namespace: "custom",
          type: field.type,
          value,
        });
      } else {
        deletingMetafields.push({
          key: field.key,
          namespace: "custom",
          ownerId: `gid://shopify/Product/${productId}`,
        });
      }
    } else if (field["isVariants"]) {
      updatingData["variants"][0][field.name] =
        productDetails[field.name]["value"];
    } else if (field.name === "images") {
      updatingData[field.name] = productDetails[field.name]["value"].map(
        (image, index) =>
          image["id"]
            ? { id: image["id"], position: index + 1 }
            : { ...image, position: index + 1 }
      );
    } else if (field.key === "tags") {
      if (Array.isArray(productDetails[field.name]["value"]))
        updatingData[field.name] =
          productDetails[field.name]["value"].join(", ");
      else updatingData[field.name] = "";
    } else {
      updatingData[field.name] = productDetails[field.name]["value"];
    }
  }

  try {
    await shopify.product.update(productId, updatingData);
    const { body } = await shopifyClient.query({
      data: {
        query: `mutation UpdateProductWithNewMedia($input: ProductInput!, $media: [CreateMediaInput!]) {
          productUpdate(input: $input, media: $media) {
            product {
              title
            }
            userErrors {
              field
              message
            }
          }
        }`,
        variables: {
          input: {
            id: `gid://shopify/Product/${productId}`,
            metafields,
          },
        },
      },
    });
    if (!body.data.productUpdate.userErrors.length) {
      const res2 = await shopifyClient.query({
        data: {
          query: `mutation metafieldsDelete($metafields: [MetafieldIdentifierInput!]!) {
          metafieldsDelete(metafields: $metafields) {
            userErrors {
              field
              message
            }
          }
      }`,
          variables: {
            metafields: deletingMetafields,
          },
        },
      });
      if (!res2.body.data.metafieldsDelete.userErrors.length) {
        return res.json({ message: "Successfully updated!" });
      } else {
        console.log(
          "deleting metafield error:",
          res2.body.data.metafieldsDelete.userErrors
        );
        return res
          .status(400)
          .json({ message: res2.body.data.metafieldsDelete.userErrors[0] });
      }
    } else {
      console.log(
        "updating metafields error:",
        body.data.productUpdate.userErrors
      );
      return res
        .status(400)
        .json({ message: body.data.productUpdate.userErrors[0] });
    }
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const duplicateProduct = async (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret");
  let user = await User.findOne({ username: decodedToken?.username });

  const productId = req.params.productId;
  const { productTitle } = req.body;

  try {
    const data = await shopifyClient.query({
      data: {
        query: `mutation DuplicateProduct($productId: ID!, $newTitle: String!, $includeImages: Boolean, $newStatus: ProductStatus) {
          productDuplicate(productId: $productId, newTitle: $newTitle, includeImages: $includeImages, newStatus: $newStatus) {
            newProduct {
              id
              title
              productType
              metafield(namespace: "custom", key: "lot_") {
                id
              }
            }
            userErrors {
              field
              message
            }
          }
        }`,
        variables: {
          productId: `gid://shopify/Product/${productId}`,
          newTitle: productTitle,
          includeImages: true,
          newStatus: "ACTIVE",
          synchronous: false,
        },
      },
    });

    let newProductId = data.body.data.productDuplicate.newProduct.id.split("/");
    newProductId = newProductId[newProductId.length - 1];
    await Product.create({
      productId: newProductId,
      uploadedBy: user._id,
    });

    if (
      data.body.data.productDuplicate.newProduct.productType === "Wholesale"
    ) {
      let wholesaleTitle = await saveNewWholesale();
      let metafieldId =
        data.body.data.productDuplicate.newProduct.metafield.id.split("/");
      metafieldId = metafieldId[metafieldId.length - 1];

      await shopify.metafield.update(metafieldId, { value: wholesaleTitle });
    }

    res.json({
      message: "Successfully duplicated!",
      newProduct: { id: newProductId, title: productTitle },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getProductStructure = async (req, res) => {
  let details = {};
  for (let field of detailFields) {
    details[field.name] = { ...field };
  }
  return res.json({ message: "Success!", details });
};

const getProduct = async (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const { username } = jwt.verify(token, "secret");
  let user = await User.findOne({ username });
  if (!user) {
    return res
      .status(401)
      .json({ message: "Wrong credentials! Please login again.." });
  }
  const productId = req.params.productId;
  let product = null;
  try {
    product = await shopify.product.get(productId);
  } catch (error) {
    console.log("product error: ", error);
    return res.status(400).json({ message: "Incorrect product ID!" });
  }
  let metafields = [];
  try {
    metafields = await shopify.metafield.list({
      metafield: { owner_resource: "product", owner_id: productId },
    });

    for (let metafield of metafields) {
      if (metafield["key"] === "uploaded_by") {
        if (metafield["value"] !== username) {
          return res.status(400).json({ message: "Invalid product ID" });
        }
        break;
      }
    }
  } catch (error) {
    console.log("metafield error: ", error);
    return res.status(400).json({ message: "Incorrect product ID!" });
  }

  let details = {};
  for (let field of detailFields) {
    details[field.name] = { ...field };

    if (field.isMetafield) {
      let metafield = metafields.find(
        (metafield) => metafield["key"] === field["key"]
      );

      if (metafield) {
        details[field.name]["value"] = metafield["value"];
        details[field.name]["id"] = metafield["id"];
      }
    } else if (field.isVariants) {
      details[field.name]["value"] = product["variants"][0][field.key];
    } else {
      details[field.name]["value"] = product[field.key];
    }

    if (
      field.isMultiSelect &&
      typeof details[field.name]["value"] === "string"
    ) {
      if (field.key === "tags")
        details[field.name]["value"] = details[field.name]["value"].split(", ");
      else
        details[field.name]["value"] = JSON.parse(details[field.name]["value"]);
    }
  }
  return res.json({ message: "Success!", details });
};

const getProducts = async (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret");
  let user = await User.findOne({ username: decodedToken?.username });
  let uploadedProducts = await Product.find({ uploadedBy: user._id });
  if (uploadedProducts.length === 0) {
    return res.json({ message: "Success!", products: [] });
  }
  let ids = uploadedProducts.map((product) => product.productId);

  try {
    const products = await shopify.product.list({ ids: ids.join(",") });
    products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    for (let product of uploadedProducts) {
      if (!products.find((p) => p.id.toString() === product.productId)) {
        await Product.findByIdAndDelete(product._id);
      }
    }

    return res.json({ message: "Success!", products });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const removeProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    await shopify.product.delete(productId);
    await Product.findOneAndDelete({ productId });
    return res.json({ message: "Successfully removed!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error!" });
  }
};

const getWholesaleTitle = async (_, res) => {
  const [no] = await WholesaleNo.find({});
  if (!no) return res.json({ message: "Success!", title: "Lot #00071" });
  return res.json({
    message: "Success!",
    title: `Lot #${(no.no + 1).toString().padStart(5, "0")}`,
  });
};

module.exports = {
  getDetails,
  upload,
  getProducts,
  removeProduct,
  duplicateProduct,
  getProduct,
  updateProduct,
  getProductStructure,
  getWholesaleTitle,
};
