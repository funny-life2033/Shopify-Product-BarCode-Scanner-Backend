module.exports = [
  {
    name: "images",
    key: "images",
    label: "Images",
    type: "list.image",
    isMultiSelect: true,
    product_type: "All",
  },
  {
    name: "product_type",
    key: "product_type",
    label: "Product type",
    type: "single_line_text_field",
    options: [
      "Vinyl",
      "Blank Media",
      "CDs",
      "Cassettes",
      "DVDs & Blu-Rays",
      "Books",
      "Art",
      "Memorabilia",
      "Vintage",
      "Collectibles",
      "Store Merch",
      "LaserDisc",
      "Wholesale",
    ],
  },
  {
    name: "tags",
    key: "tags",
    label: "Tags",
    type: "list.single_line_text_field",
    isMultiSelect: true,
    options: [
      "Vinyl",
      "Blank Media",
      "CDs",
      "Cassettes",
      "DVDs & Blu-Rays",
      "Books",
      "Art",
      "Memorabilia",
      "Vintage",
      "Collectibles",
      "Store Merch",
      "LaserDisc",
      "Wholesale",
      "Vault",
    ],
    product_type: "All",
  },
  {
    name: "vendor",
    key: "vendor",
    label: "Vendor",
    type: "single_line_text_field",
    product_type: "All",
  },
  {
    name: "price",
    key: "price",
    label: "Price",
    type: "number_decimal",
    isVariants: true,
    product_type: "All",
  },
  {
    name: "inventory_quantity",
    key: "inventory_quantity",
    label: "Quantity",
    type: "number_integer",
    isVariants: true,
    product_type: "All",
  },
  {
    name: "weight",
    key: "weight",
    label: "Weight",
    type: "number_decimal",
    isVariants: true,
    product_type: "All",
  },
  {
    name: "weight_unit",
    key: "weight_unit",
    label: "Weight unit",
    type: "single_line_text_field",
    isVariants: true,
    options: ["lb", "oz", "kg", "g"],
    product_type: "All",
  },
  {
    name: "barcode",
    key: "barcode",
    label: "UPC",
    type: "single_line_text_field",
    isVariants: true,
    product_type: "All",
  },
  {
    name: "condition",
    key: "condition",
    label: "Condition",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["New", "Used"],
    product_type: "All",
  },
  {
    name: "release_year",
    key: "release_year",
    label: "Release year / Year",
    type: "list.number_integer",
    isMetafield: true,
    isMultiSelect: true,
    product_type: "All",
  },
  {
    name: "lot_",
    key: "lot_",
    label: "Lot #",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Wholesale"],
  },
  {
    name: "quantity_in_lot",
    key: "quantity_in_lot",
    label: "Quantity in Lot",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Wholesale"],
  },
  {
    name: "lot_product_type",
    key: "lot_product_type",
    label: "Lot Product Type",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Wholesale"],
  },
  {
    name: "product_title",
    key: "title",
    label: "Product Title",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: [
      "Vinyl",
      "CDs",
      "Cassettes",
      "DVDs & Blu-Rays",
      "Books",
      "Art",
      "LaserDisc",
      "Wholesale",
    ],
  },
  {
    name: "movie_title",
    key: "movie_title",
    label: "Movie Title",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["LaserDisc"],
  },
  {
    name: "artist",
    key: "artist",
    label: "Artist",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: [
      "Vinyl",
      "CDs",
      "Cassettes",
      "Art",
      "LaserDisc",
      "Wholesale",
    ],
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
      "Religious",
    ],
    product_type: ["Vinyl", "CDs", "Cassettes", "LaserDisc", "Wholesale"],
  },
  {
    name: "vinyl_grade",
    key: "vinyl_grade",
    label: "Vinyl grade / Condition",
    type: "list.single_line_text_field",
    isMetafield: true,
    isMultiSelect: true,
    options: ["Sealed", "NM", "EX", "VG++", "VG+", "VG", "New", "Used"],
    product_type: ["Vinyl", "CDs", "Cassettes", "LaserDisc", "Wholesale"],
  },
  {
    name: "art_type",
    key: "art_type",
    label: "Art Type",
    type: "single_line_text_field",
    isMetafield: true,
    options: [
      "Painting",
      "Drawing",
      "Photograph",
      "Print",
      "Mixed Media / Collage",
      "Sculpture",
      "Poster",
      "Other Art",
      "Screenprint",
      "Etching",
      "Lithograph",
      "Silkscreen",
    ],
    product_type: ["Art"],
  },
  {
    name: "price_on_request",
    key: "price_on_request",
    label: "Price On Request",
    type: "boolean",
    isMetafield: true,
    options: ["true", "false"],
    product_type: ["Art"],
  },
  {
    name: "production_technique",
    key: "production_technique",
    label: "Production Technique",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Art"],
  },
  {
    name: "signed",
    key: "signed",
    label: "Signed",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["Yes", "No"],
    product_type: ["Art"],
  },
  {
    name: "product_size",
    key: "product_size",
    label: "Size",
    type: "single_line_text_field",
    isMetafield: true,
    options: ['12"', '10"', '7"'],
    product_type: ["Vinyl"],
  },
  {
    name: "dimensions",
    key: "dimensions",
    label: "Dimensions",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Art"],
  },
  {
    name: "type",
    key: "type",
    label: "Type",
    type: "single_line_text_field",
    isMetafield: true,
    // isMultiSelect: true,
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
    product_type: ["Vinyl"],
  },
  {
    name: "speed",
    key: "speed",
    label: "Speed",
    type: "list.single_line_text_field",
    isMetafield: true,
    isMultiSelect: true,
    options: ["33 RPM", "45 RPM", "78 RPM"],
    product_type: ["Vinyl"],
  },
  {
    name: "catalog",
    key: "catalog",
    label: "Catalog #",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Vinyl", "CDs", "Cassettes", "LaserDisc", "Wholesale"],
  },
  {
    name: "record_label",
    key: "record_label",
    label: "Record Label",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Vinyl", "CDs", "Cassettes", "LaserDisc", "Wholesale"],
  },
  {
    name: "genre",
    key: "genre",
    label: "Genre",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["DVDs & Blu-Rays"],
  },
  {
    name: "rating",
    key: "rating",
    label: "Rating",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["DVDs & Blu-Rays"],
  },
  {
    name: "author",
    key: "author",
    label: "Author (Book)",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Books"],
  },
  {
    name: "publisher",
    key: "publisher",
    label: "Publisher (Book)",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Books"],
  },
  {
    name: "cover_type",
    key: "cover_type",
    label: "Cover Type (Book)",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["Hardcover", "Softcover"],
    product_type: ["Books"],
  },
  {
    name: "edition",
    key: "edition",
    label: "Edition (Book)",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Books"],
  },
  {
    name: "edition_aritst",
    key: "edition_aritst",
    label: "Edition (Art)",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Art"],
  },
  {
    name: "framed",
    key: "framed",
    label: "Framed",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["Yes", "No"],
    product_type: ["Art"],
  },
  {
    name: "certificate_of_authenticity",
    key: "certificate_of_authenticity",
    label: "Certificate of Authenticity",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["Yes", "No"],
    product_type: ["Art"],
  },
  {
    name: "media_type",
    key: "media_type",
    label: "Media Type",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Blank Media"],
  },
  {
    name: "brand",
    key: "brand",
    label: "Brand",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Blank Media", "Wholesale"],
  },
  {
    name: "model",
    key: "model",
    label: "Model",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Blank Media"],
  },
  {
    name: "capacity",
    key: "capacity",
    label: "Capacity",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Blank Media"],
  },
  {
    name: "country_of_manufacture",
    key: "country_of_manufacture",
    label: "Country of Manufacture",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: ["Vinyl", "CDs", "Cassettes", "LaserDisc", "Wholesale"],
  },
  {
    name: "autographed",
    key: "autographed",
    label: "Autographed",
    type: "single_line_text_field",
    isMetafield: true,
    options: ["Yes", "No"],
    product_type: [
      "Vinyl",
      "CDs",
      "Cassettes",
      "Books",
      "LaserDisc",
      "Wholesale",
    ],
  },
  {
    name: "box_",
    key: "box_",
    label: "Box #",
    type: "single_line_text_field",
    isMetafield: true,
    product_type: [
      "Vinyl",
      "Blank Media",
      "CDs",
      "Cassettes",
      "DVDs & Blu-Rays",
      "Books",
      "Art",
      "Memorabilia",
      "Vintage",
      "Collectibles",
      "Store Merch",
      "LaserDisc",
    ],
  },
  {
    name: "title",
    key: "title",
    label: "Title",
    type: "single_line_text_field",
    product_type: "All",
  },
  {
    name: "body_html",
    key: "body_html",
    label: "Description",
    type: "rich_text_field",
    product_type: "All",
  },
];
