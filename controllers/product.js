const axios = require("axios");
const detailFields = require("../config/details");
const Shopify = require("shopify-api-node");
const jwt = require("jsonwebtoken");
const Product = require("../models/products");
const User = require("../models/users");
require("dotenv").config();

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  accessToken: process.env.SHOPIFY_API_TOKEN,
});

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
        title: `${artist} - ${title}${
          release_year ? ` - ${release_year}` : ""
        }`,
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

    detailFields.forEach((field) => {
      if (details[field.name]["value"]) {
        let value = details[field.name]["value"];
        if (Array.isArray(value)) {
          value = value.filter((value) => value && value !== "");
          value = JSON.stringify(value);
        }
        if (field["isMetafield"]) {
          creatingData["metafields"] = [
            ...creatingData["metafields"],
            {
              key: details[field.name]["name"],
              value: value,
              type: details[field.name]["type"],
              namespace: "custom",
            },
          ];
        } else if (field["isVariants"]) {
          creatingData["variants"][0][field.name] =
            details[field.name]["value"];
        } else {
          creatingData[field.name] = details[field.name]["value"];
        }
      }
    });

    try {
      const response = await shopify.product.create(creatingData);
      await Product.create({
        productId: response.id,
        discogsId: details.id,
        uploadedBy: user._id,
      });
      successed.push({ discogsId: details.id, id: response.id });
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

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { key, detail } = req.body;
  let updatingData = {
    variants: [{ inventory_management: "shopify" }],
  };
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
        };
      } else if (field["isVariants"]) {
        updatingData["variants"][0][field.name] = detail["value"];
      } else if (field.name === "images") {
        updatingData[field.name] = detail["value"].map((image) =>
          image["id"] ? { id: image["id"] } : image
        );
      } else {
        updatingData[field.name] = detail["value"];
      }
    }
  });

  try {
    await shopify.product.update(productId, updatingData);

    if (metafield) {
      await shopify.metafield.update(metafield.id, { value: metafield.value });
    }

    return res.json({ message: "Successfully updated!" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
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
        (metafield) => metafield["key"] === field["name"]
      );

      if (metafield) {
        details[field.name]["value"] = metafield["value"];
        details[field.name]["id"] = metafield["id"];
      }
    } else if (field.isVariants) {
      details[field.name]["value"] = product["variants"][0][field.name];
    } else {
      details[field.name]["value"] = product[field.name];
    }

    if (
      field.isMultiSelect &&
      typeof details[field.name]["value"] === "string"
    ) {
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

module.exports = {
  getDetails,
  upload,
  getProducts,
  removeProduct,
  getProduct,
  updateProduct,
};
