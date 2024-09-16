module.exports = [
  {
    name: "title",
    key: "title",
    label: "Title",
    type: "single_line_text_field",
  },
  {
    name: "body_html",
    key: "body_html",
    label: "Description",
    type: "rich_text_field",
  },
  {
    name: "images",
    key: "images",
    label: "Images",
    type: "list.image",
    isMultiSelect: true,
  },
  {
    name: "product_type",
    key: "product_type",
    label: "Product type",
    type: "single_line_text_field",
    options: [
      "Blank Media",
      "cassettes",
      "CDs",
      "Collectibles",
      "DVDs & Blu-Rays",
      "LaserDisc",
      "mws_fee_generated",
      "mws_fee_generated_clone",
      "Vinyl",
    ],
  },
  {
    name: "vendor",
    key: "vendor",
    label: "Vendor",
    type: "single_line_text_field",
  },
  {
    name: "price",
    key: "price",
    label: "Price",
    type: "number_decimal",
    isVariants: true,
  },
  {
    name: "inventory_quantity",
    key: "inventory_quantity",
    label: "Quantity",
    type: "number_integer",
    isVariants: true,
  },
  {
    name: "weight",
    key: "weight",
    label: "Weight",
    type: "number_decimal",
    isVariants: true,
  },
  {
    name: "weight_unit",
    key: "weight_unit",
    label: "Weight unit",
    type: "single_line_text_field",
    isVariants: true,
    options: ["lb", "oz", "kg", "g"],
  },
  {
    name: "product_title",
    key: "title",
    label: "Product Title",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "artist",
    key: "artist",
    label: "Artist",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "author",
    key: "author",
    label: "Author (Book)",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "upc_",
    key: "upc_",
    label: "UPC",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "genre_",
    key: "genre_",
    label: "Genre",
    type: "list.single_line_text_field",
    isMetafield: true,
    isMultiSelect: true,
    options: [
      "Rock & Pop",
      "Heavy Metal",
      "Hip Hop",
      "Blues",
      "Country",
      "Jazz",
      "R & B",
      "Punk",
      "Electronic",
      "Folk",
      "Reggae",
      "Latin",
      "International",
      "Soundtracks",
      "Non-Music",
      "Childrens",
      "Holiday",
      "Classical",
      "Doo-Wop",
    ],
  },
  {
    name: "vinyl_grade",
    key: "vinyl_grade",
    label: "Vinyl grade / Condition",
    type: "list.single_line_text_field",
    isMetafield: true,
    isMultiSelect: true,
    options: ["Sealed", "NM", "EX", "VG++", "VG+", "VG", "New", "Used"],
  },
  {
    name: "condition",
    key: "condition",
    label: "Condition",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["New", "Used"],
  },
  {
    name: "product_size",
    key: "product_size",
    label: "Size",
    type: "single_line_text_field",
    isMetafield: true,
    options: ['12"', '10"', '7"'],
  },
  {
    name: "type",
    key: "type",
    label: "Type",
    type: "list.single_line_text_field",
    isMetafield: true,
    isMultiSelect: true,
    options: [
      "LP",
      "Double LP",
      "Triple LP",
      "Box Set",
      "EP",
      "Single",
      "Maxi-Single",
      "Mini LP",
    ],
  },
  {
    name: "speed",
    key: "speed",
    label: "Speed",
    type: "list.single_line_text_field",
    isMetafield: true,
    isMultiSelect: true,
    options: ["33 RPM", "45 RPM", "78 RPM"],
  },
  {
    name: "catalog",
    key: "catalog",
    label: "Catalog #",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "record_label",
    key: "record_label",
    label: "Record Label",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "release_year",
    key: "release_year",
    label: "Release year / Year",
    type: "list.number_integer",
    isMetafield: true,
    isMultiSelect: true,
  },
  {
    name: "cover_type",
    key: "cover_type",
    label: "Cover Type (Book)",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["Hardcover", "Softcover"],
  },
  {
    name: "edition",
    key: "edition",
    label: "Edition (Book)",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "country_of_manufacture",
    key: "country_of_manufacture",
    label: "Country of Manufacture",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "autographed",
    key: "autographed",
    label: "Autographed",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["Yes", "No"],
  },
];
