module.exports = [
  {
    name: "title",
    label: "Title",
    type: "single_line_text_field",
  },
  { name: "body_html", label: "Description", type: "rich_text_field" },
  { name: "images", label: "Images", type: "list.image", isMultiSelect: true },
  {
    name: "product_type",
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
  { name: "vendor", label: "Vendor", type: "single_line_text_field" },
  {
    name: "price",
    label: "Price",
    type: "number_decimal",
    isVariants: true,
  },
  {
    name: "inventory_quantity",
    label: "Quantity",
    type: "number_integer",
    isVariants: true,
  },
  {
    name: "weight",
    label: "Weight",
    type: "number_decimal",
    isVariants: true,
  },
  {
    name: "weight_unit",
    label: "Weight unit",
    type: "single_line_text_field",
    isVariants: true,
    options: ["lb", "oz", "kg", "g"],
  },
  {
    name: "artist",
    label: "Artist",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "author",
    label: "Author (Book)",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "title",
    label: "Title",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "upc_",
    label: "UPC",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "genre_",
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
    label: "Vinyl grade / Condition",
    type: "list.single_line_text_field",
    isMetafield: true,
    isMultiSelect: true,
    options: ["Sealed", "NM", "EX", "VG++", "VG+", "VG", "New", "Used"],
  },
  {
    name: "condition",
    label: "Condition",
    type: "list.single_line_text_field",
    isMetafield: true,
    options: ["New", "Used"],
  },
  {
    name: "product_size",
    label: "Size",
    type: "single_line_text_field",
    isMetafield: true,
    options: ['12"', '10"', '7"'],
  },
  {
    name: "type",
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
    label: "Speed",
    type: "list.single_line_text_field",
    isMetafield: true,
    isMultiSelect: true,
    options: ["33 RPM", "45 RPM", "78 RPM"],
  },
  {
    name: "catalog",
    label: "Catalog #",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "record_label",
    label: "Record Label",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "release_year",
    label: "Release year / Year",
    type: "list.number_integer",
    isMetafield: true,
    isMultiSelect: true,
  },
  {
    name: "cover_type",
    label: "Cover Type (Book)",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["Hardcover", "Softcover"],
  },
  {
    name: "edition",
    label: "Edition (Book)",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "country_of_manufacture",
    label: "Country of Manufacture",
    type: "single_line_text_field",
    isMetafield: true,
  },
  {
    name: "autographed",
    label: "Autographed",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["Yes", "No"],
  },
];
