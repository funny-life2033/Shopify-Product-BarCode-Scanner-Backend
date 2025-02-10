const axios = require("axios");
const detailFields = require("../config/details");
const Shopify = require("shopify-api-node");
const { shopifyApi } = require("@shopify/shopify-api");
const jwt = require("jsonwebtoken");
const Product = require("../models/products");
const User = require("../models/users");
const WholesaleNo = require("../models/wholesaleNo");
const { sleep } = require("../config/utils");
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

require("@shopify/shopify-api/adapters/node");
require("dotenv").config();

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  accessToken: process.env.SHOPIFY_API_TOKEN,
  timeout: 300000,
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

const drawRoundedRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y); // Move to the top-left corner
  ctx.lineTo(x + width - radius, y); // Top edge
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius); // Top-right corner
  ctx.lineTo(x + width, y + height - radius); // Right edge
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); // Bottom-right corner
  ctx.lineTo(x + radius, y + height); // Bottom edge
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius); // Bottom-left corner
  ctx.lineTo(x, y + radius); // Left edge
  ctx.quadraticCurveTo(x, y, x + radius, y); // Top-left corner
  ctx.closePath();
  ctx.fill(); // Fill the rectangle
};

const addTextToImage = async (image, text) => {
  const img = await loadImage(image);

  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  const fontSize = Math.floor(img.height / 17);
  ctx.font = `${fontSize}px Arial`;

  const textX =
    img.width - ctx.measureText(text).width - Math.floor(fontSize / 2);
  const textY = img.height - Math.floor(fontSize / 2);

  const rectX = textX - Math.floor(fontSize / 7);
  const rectY =
    textY - fontSize + Math.floor(fontSize / 8) - Math.floor(fontSize / 10);
  const rectWidth =
    ctx.measureText(text).width + Math.floor((fontSize / 7) * 2);
  const rectHeight = fontSize + Math.floor((fontSize / 10) * 2);

  ctx.fillStyle = "white";
  drawRoundedRect(
    ctx,
    rectX,
    rectY,
    rectWidth,
    rectHeight,
    Math.floor(fontSize / 6)
  );

  ctx.fillStyle = "black";
  ctx.fillText(text, textX, textY);

  const newImage = canvas.toDataURL("image/jpeg");

  return newImage;
};

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
  const { barcode } = req.body;
  if (!barcode) return res.status(400).json({ message: "Incorrect UPC" });

  try {
    const { data } = await axios.default.get(
      `https://api.discogs.com/database/search?barcode=${barcode}`,
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
      if (barcode.length === 12 || barcode.length === 11) {
        const barcode10 = barcode.substring(1, 11);

        const res10 = await axios.default.get(
          `https://api.discogs.com/database/search?barcode=${barcode10}`,
          {
            headers: {
              Authorization: `Discogs token=${process.env.DISCOGS_API_TOKEN}`,
            },
          }
        );

        if (!res10.data || !res10.data.results) {
          return res.status(500).json({ message: "Server error!" });
        }

        if (res10.data.results.length === 0 && barcode.length === 12) {
          const barcode11 = barcode.substring(0, 11);
          const res11 = await axios.default.get(
            `https://api.discogs.com/database/search?barcode=${barcode11}`,
            {
              headers: {
                Authorization: `Discogs token=${process.env.DISCOGS_API_TOKEN}`,
              },
            }
          );

          if (!res11.data || !res11.data.results) {
            return res.status(500).json({ message: "Server error!" });
          }

          data.results = res11.data.results;
        } else {
          data.results = res10.data.results;
        }
      } else return res.status(400).json({ message: "Incorrect UPC!" });
    }

    if (data.results.length === 0) {
      return res.status(400).json({ message: "Incorrect UPC!" });
    }

    let productDetails = data.results.map((result) => {
      let [artist, title] = result["title"].split(" - ");
      let images = [{ src: result["cover_image"] }];
      let genre_ = [
        ...new Set(
          result["genre"].map((genre) =>
            genre === "Rock" || genre === "Pop"
              ? "Rock & Pop"
              : genre === "Funk / Soul"
              ? "R & B"
              : genre === "Folk, World, & Country"
              ? "Country"
              : genre
          )
        ),
      ];
      if (result["style"] && Array.isArray(result["style"])) {
        if (
          result["style"].includes("Heavy Metal") ||
          result["style"].includes("Hard Rock")
        )
          genre_.push("Heavy Metal");

        if (result["style"].includes("Folk")) {
          genre_.push("Folk");
        }

        if (result["style"].includes("Punk")) {
          genre_.push("Punk");
        }
      }

      let release_year = result["year"];
      let record_label = [...new Set(result["label"])];
      let vendor = [...new Set(result["label"])];
      let product_type = [
        ...new Set(
          result["format"].map((format) =>
            format.toLocaleLowerCase() === "dvd"
              ? "DVDs"
              : format.toLocaleLowerCase() === "cd"
              ? "CDs"
              : format.toLocaleLowerCase() === "cassette"
              ? "Cassettes"
              : format
          )
        ),
      ];
      let country_of_manufacture = result["country"];
      let catalog =
        result["catno"] && result["catno"] !== "none" ? result["catno"] : "";

      let filteredData = {
        artist,
        images,
        title: "",
        product_title: title,
        barcode: barcode,
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
              if (
                filteredData[field.name] &&
                filteredData[field.name] !== "" &&
                filteredData[field.name] !== "none"
              )
                details[field.name]["value"] = [filteredData[field.name]];
              else details[field.name]["value"] = [];
            } else
              details[field.name]["value"] =
                filteredData[field.name] && filteredData[field.name] !== "none"
                  ? filteredData[field.name]
                  : "";
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
  console.log(new Date().toLocaleTimeString(), "uploading started");
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

    let featuredImage;

    if (
      details["box_"]["value"] &&
      details["box_"]["value"] !== "" &&
      details["images"]["value"] &&
      details["images"]["value"].length &&
      details["images"]["value"][0]["src"]
    ) {
      featuredImage = await addTextToImage(
        details["images"]["value"][0]["src"],
        `Box #${details["box_"]["value"]}`
      );
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
        } else if (field["name"] === "images") {
          creatingData[field.name] = details[field.name]["value"].map(
            (value, index) =>
              index === 0 && featuredImage
                ? {
                    src: featuredImage,
                    attachment: featuredImage.split(";base64,")[1],
                  }
                : {
                    src: value["src"],
                    attachment: value["attachment"] || undefined,
                  }
          );
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
      successed.push({
        discogsId: details.id,
        id: response.id,
        images: response.images,
      });
      // fs.writeFileSync(
      //   path.join(__dirname, "creating data"),
      //   JSON.stringify(creatingData, null, 2),
      //   "utf8"
      // );
    } catch (error) {
      console.log("uploading error: ", error);
      failed.push({ discogsId: details.id });
    }
  }

  console.log(new Date().toLocaleTimeString(), "uploading ended");
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
  const {
    productDetails,
    initialProductType,
    initialFeaturedImage,
    initialBox,
  } = req.body;

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
    } catch (error) {
      console.log("getting product variants error:", error);
    }
    await sleep(1000);
  }
  let metafields = [];
  let deletingMetafields = [];
  let wholesaleTitle;
  let featuredImage;

  if (productDetails["product_type"]["value"] === "Wholesale") {
    if (initialProductType === "Wholesale") {
      wholesaleTitle = productDetails["lot_"]["value"];
    } else {
      wholesaleTitle = await saveNewWholesale();
    }
  }

  if (
    productDetails["box_"]["value"] &&
    productDetails["box_"]["value"] !== "" &&
    productDetails["images"]["value"] &&
    productDetails["images"]["value"][0]
  ) {
    if (
      productDetails["box_"]["value"] !== initialBox ||
      !initialFeaturedImage ||
      productDetails["images"]["value"][0]["id"] !== initialFeaturedImage["id"]
    ) {
      featuredImage = await addTextToImage(
        productDetails["images"]["value"][0]["src"],
        `Box #${productDetails["box_"]["value"]}`
      );
    }
  }

  for (let field of detailFields) {
    if (field["isMetafield"]) {
      let value = productDetails[field.name]["value"];
      if (Array.isArray(value)) {
        value = value.filter((value) => value && value !== "");
        value = JSON.stringify(value);
      }
      if (productDetails["product_type"]["value"] === "Wholesale") {
        if (field.key === "lot_") {
          value = wholesaleTitle;
        }

        if (field.name === "title" || field.name === "body_html") {
          if (
            value &&
            productDetails["lot_"]["value"] &&
            productDetails["lot_"]["value"] !== "" &&
            value.includes(productDetails["lot_"]["value"])
          ) {
            value = value.replace(
              productDetails["lot_"]["value"],
              wholesaleTitle
            );
          }
        }
      }

      if (typeof value === "boolean" || (value && value !== "")) {
        metafields.push({
          id: productDetails[field.name]["id"]
            ? `gid://shopify/Metafield/${productDetails[field.name]["id"]}`
            : undefined,
          key: field.key,
          namespace: "custom",
          type: field.type,
          value: `${value}`,
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
          index === 0 && featuredImage
            ? {
                src: featuredImage,
                attachment: featuredImage.split(";base64,")[1],
                position: index + 1,
              }
            : image["id"]
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
    let product = await shopify.product.update(productId, updatingData);
    let productInDB = await Product.findOne({ productId });
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret");
    let user = await User.findOne({ username: decodedToken?.username });
    if (productInDB) {
      if (productInDB.updatedBy) {
        if (productInDB.updatedBy.find((id) => user._id.equals(id))) {
          productInDB.updatedBy.push(user._id);
        }
      } else {
        productInDB.updatedBy = [user._id];
      }

      await productInDB.save();
    } else {
      await Product.create({ productId, updatedBy: [user._id] });
    }

    if (product.images.length < updatingData["images"].length) {
      fs.writeFileSync(
        path.join(__dirname, "error productId"),
        `${productId}`,
        "utf8"
      );

      fs.writeFileSync(
        path.join(__dirname, "error productDetails"),
        JSON.stringify(productDetails, null, 2),
        "utf8"
      );

      fs.writeFileSync(
        path.join(__dirname, "error updatingData"),
        JSON.stringify(updatingData, null, 2),
        "utf8"
      );

      fs.writeFileSync(
        path.join(__dirname, "error updatedResult"),
        JSON.stringify(product, null, 2),
        "utf8"
      );
    }

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
    console.log("duplicating error:", error);
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
  console.log(productId);
  let product = null;
  try {
    product = await shopify.product.get(productId);
  } catch (error) {
    console.log("product error: ", error);
    if (error.response.status === 409)
      return res.status(409).json({ message: "Too many requests" });
    return res.status(400).json({ message: "Incorrect product ID!" });
  }
  let metafields = [];
  try {
    metafields = await shopify.metafield.list({
      metafield: { owner_resource: "product", owner_id: productId },
    });

    // for (let metafield of metafields) {
    //   if (metafield["key"] === "uploaded_by") {
    //     if (metafield["value"] !== username) {
    //       return res.status(400).json({ message: "Invalid product ID" });
    //     }
    //     break;
    //   }
    // }
  } catch (error) {
    console.log("metafield error: ", error);
    return res.status(400).json({ message: "Incorrect product ID!" });
  }

  // console.log("--------------------------------------------------");
  // console.log(JSON.stringify(metafields, null, 2));
  // console.log("--------------------------------------------------");

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
      // console.log(details[field.name]);
      if (details[field.name]["value"] === "")
        details[field.name]["value"] = [];
      else if (field.key === "tags")
        details[field.name]["value"] = details[field.name]["value"].split(", ");
      else {
        try {
          details[field.name]["value"] = JSON.parse(
            details[field.name]["value"]
          );
        } catch (error) {
          details[field.name]["value"] = [];
        }
      }
    }
  }
  return res.json({ message: "Success!", details });
};

const getProducts = async (req, res) => {
  const { searchWord } = req.body;
  console.log("searching word:", searchWord);
  console.log("start:", new Date().toLocaleTimeString());

  if (searchWord && searchWord !== "") {
    const products = [];
    let after;
    while (true) {
      try {
        const res = await shopifyClient.query({
          data: `query {
            products(first: 250, query:"title:*${searchWord}*"${
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

        for (let product of res.body.data.products.nodes) {
          let words = searchWord.toLocaleLowerCase().split(" ");
          let title = product.title.toLocaleLowerCase();
          let isIncluded = true;
          for (let word of words) {
            if (!title.includes(word)) {
              isIncluded = false;
              break;
            }
          }
          if (isIncluded) {
            products.push({
              id: product.id.split("/Product/")[1],
              title: product.title,
            });
          }
        }

        if (
          res.body.data.products.pageInfo.hasNextPage &&
          res.body.data.products.nodes.length
        ) {
          after = res.body.data.products.pageInfo.endCursor;
        } else {
          break;
        }
      } catch (error) {
        console.log("getting products by searching word eror:", error);
      }
    }

    return res.json({
      message: `${products.length} products found!`,
      products,
    });
  }
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret");
  let user = await User.findOne({ username: decodedToken?.username });
  let uploadedProducts = await Product.find({
    $or: [{ uploadedBy: user._id }, { updatedBy: user._id }],
  });
  if (uploadedProducts.length === 0) {
    return res.json({ message: "Success!", products: [] });
  }
  let ids = uploadedProducts.map((product) => product.productId).slice(-20);
  console.log("got ids:", new Date().toLocaleTimeString());

  try {
    let products = [];

    for (let i = 0; i < Math.ceil(ids.length / 250); i++) {
      let newProducts;
      while (true) {
        try {
          newProducts = await shopify.product.list({
            ids: ids.slice(i * 250, i * 250 + 250).join(","),
            limit: 250,
          });
          break;
        } catch (error) {
          console.log("getting products by ids error:", error);
          await sleep(30000);
        }
      }
      products = [...products, ...newProducts];
    }

    products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    console.log("got uploaded products:", new Date().toLocaleTimeString());

    // for (let product of uploadedProducts) {
    //   if (!products.find((p) => p.id.toString() === product.productId)) {
    //     await Product.findByIdAndDelete(product._id);
    //   }
    // }
    console.log("ended:", new Date().toLocaleTimeString());

    return res.json({ message: "Success!", products });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getProductsCount = async (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret");
  let user = await User.findOne({ username: decodedToken?.username });
  let uploadedProducts = await Product.find({
    uploadedBy: user._id,
  });

  res.json({
    message: `You have ${uploadedProducts.length} products uploaded`,
    count: uploadedProducts.length,
  });
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

const searchProducts = async (req, res) => {
  const { barcode, title, artist, box } = req.body;
  // if (box && box !== "") {
  let products = [];
  let metafields = detailFields.filter((field) => field.isMetafield);

  if (barcode && barcode !== "") {
    let after;
    const nodes = [];

    const barcodes = [barcode];
    if (barcode.length === 12 || barcode.length === 11) {
      barcodes.push(barcode.substring(1, 11));
    }

    if (barcode.length === 12) {
      barcodes.push(barcode.substring(0, 11));
    }

    for (let barcode_ of barcodes) {
      after = null;
      while (true) {
        let res;
        try {
          res = await shopifyClient.query({
            data: `query {
              productVariants(first: 250, query: "barcode:${barcode_}"${
              after ? `, after: "${after}"` : ""
            }) {
                edges {
                  node {
                    price
                    inventoryQuantity
                    inventoryItem {
                      measurement {
                        weight {
                          unit
                          value
                        }
                      }
                    }
                    product {
                      id
                      title
                      bodyHtml
                      productType
                      tags
                      images(first: 100) {
                        nodes {
                          src
                        }
                      }
                      vendor
                      metafields(first: 100, keys: [${metafields
                        .map(({ key }) => `"custom.${key}"`)
                        .join(", ")}]) {
                        edges {
                          node {
                            key
                            value
                          }
                        }
                      }
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
        } catch (error) {
          console.log("getting products by barcode error: ", error);
          return res.status(500).json({ message: "Please try again!" });
        }
        nodes.push(...res.body.data.productVariants.edges);

        if (
          res.body.data.productVariants.pageInfo.hasNextPage &&
          res.body.data.productVariants.edges.length
        ) {
          after = res.body.data.productVariants.pageInfo.endCursor;
        } else {
          break;
        }
      }
    }

    for (let { node } of nodes) {
      if (!products.find((product) => product.id === node.product.id)) {
        products.push({
          id: node.product.id,
          Title: node.product.title,
          images: node.product.images.nodes,
          Description: node.product.bodyHtml,
          "Product type": node.product.productType,
          Tags: node.product.tags,
          Vendor: node.product.vendor,
          Price: node.price,
          Quantity: node.inventoryQuantity,
          Weight: node.inventoryItem.measurement.weight.value,
          "Weight unit": node.inventoryItem.measurement.weight.unit,
          Barcode: barcode,
          metafields: node.product.metafields.edges
            .map(({ node }) => ({
              ...node,
              ...metafields.find((field) => node.key === `custom.${field.key}`),
            }))
            .filter(
              (data) =>
                data.value &&
                data.value !== "" &&
                (!data.type.startsWith("list.") ||
                  JSON.parse(data.value).length) &&
                (data.product_type === "All" ||
                  data.product_type.includes(node.product.productType))
            ),
        });
      }
    }
  } else {
    let after;
    let productIds = [];

    const keys = [];
    if (title && title !== "" && artist && artist !== "")
      keys.push("custom.title", "custom.artist");
    else if (box && box !== "") keys.push("custom.box_");

    if (keys.length === 0)
      return res.status(400).json({ message: "Please provide correct values" });

    while (true) {
      let res;
      try {
        res = await shopifyClient.query({
          data: `query {
              products(first: 250${after ? `, after: "${after}"` : ""}) {
                edges {
                  node {
                    id
                    metafields(first: 2, keys: [${keys
                      .map((key) => `"${key}"`)
                      .join(", ")}]) {
                      edges {
                        node {
                          key
                          value
                        }
                      }
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
      } catch (error) {
        console.log(
          "getting products with title and artist metafields error:",
          error
        );
        await sleep(30000);
      }

      for (let { node } of res.body.data.products.edges) {
        if (!productIds.find((id) => node.id === id)) {
          const fields = {};
          for (let key of keys) {
            let metafield = node.metafields.edges.find(
              ({ node }) => node.key === key
            );
            if (metafield) fields[key] = metafield;
          }

          if (
            (artist &&
              title &&
              fields["custom.artist"] &&
              fields["custom.title"] &&
              (artist === fields["custom.artist"].node.value) === artist &&
              (title === fields["custom.title"].node.value) === title) ||
            (box &&
              fields["custom.box_"] &&
              fields["custom.box_"].node.value
                .split("/")
                .map((num) => num.trim())
                .includes(box))
          ) {
            productIds.push(node.id);
          }
        }
      }

      if (
        res.body.data.products.pageInfo.hasNextPage &&
        res.body.data.products.edges.length
      ) {
        after = res.body.data.products.pageInfo.endCursor;
      } else {
        break;
      }
    }

    for (let i = 0; i < Math.ceil(productIds.length / 250); i++) {
      let res;
      while (true) {
        try {
          res = await shopifyClient.query({
            data: `query {
              ${productIds
                .slice(i * 250, i * 250 + 250)
                .map(
                  (id) => `Product_${
                    id.split("Product/")[1]
                  }: product(id: "${id}") {
                id
                title
                bodyHtml
                productType
                tags
                images(first: 100) {
                  nodes {
                    src
                  }
                }
                vendor
                variants(first: 1) {
                  nodes {
                    barcode
                    price
                    inventoryQuantity
                    inventoryItem {
                      measurement {
                        weight {
                          unit
                          value
                        }
                      }
                    }
                  }
                }
                metafields(first: 100, keys: [${metafields
                  .map(({ key }) => `"custom.${key}"`)
                  .join(", ")}]) {
                  edges {
                    node {
                      key
                      value
                    }
                  }
                }
              }`
                )
                .join(`\n\n`)}
            }`,
          });

          break;
        } catch (error) {
          console.log("getting products error:", error);
          await sleep(30000);
        }
      }

      for (let id of Object.keys(res.body.data)) {
        let node = res.body.data[id];

        products.push({
          id: node.id,
          Title: node.title,
          images: node.images.nodes,
          Description: node.bodyHtml,
          "Product type": node.productType,
          Tags: node.tags,
          Vendor: node.vendor,
          Barcode: node.variants.nodes[0].barcode,
          Price: node.variants.nodes[0].price,
          Quantity: node.variants.nodes[0].inventoryQuantity,
          Weight: node.variants.nodes[0].inventoryItem.measurement.weight.value,
          "Weight unit":
            node.variants.nodes[0].inventoryItem.measurement.weight.unit,
          metafields: node.metafields.edges
            .map(({ node }) => ({
              ...node,
              ...metafields.find((field) => node.key === `custom.${field.key}`),
            }))
            .filter(
              (data) =>
                data.value &&
                data.value !== "" &&
                (!data.type.startsWith("list.") ||
                  JSON.parse(data.value).length) &&
                (data.product_type === "All" ||
                  data.product_type.includes(node.productType))
            ),
        });
      }
    }
  }

  res.json({
    message: `${products.length} products found in your store!`,
    products,
  });
  // } else {
  //   return res.status(400).json({ message: "Please provide box value" });
  // }
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
  searchProducts,
  getProductsCount,
};
