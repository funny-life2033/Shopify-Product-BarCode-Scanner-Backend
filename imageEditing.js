const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const addTextToImage = async (image, text) => {
  const img = await loadImage(image);

  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  const fontSize = Math.floor(img.height / 10);
  ctx.font = `${fontSize}px Arial`;

  const textX =
    img.width - ctx.measureText(text).width - Math.floor(img.height / 20);
  const textY = img.height - Math.floor(img.height / 20);

  const rectX = textX - Math.floor(img.height / 170);
  const rectY =
    textY - Math.floor((fontSize * 2) / 3) - Math.floor(img.height / 85);
  const rectWidth = ctx.measureText(text).width + Math.floor(img.height / 85);
  const rectHeight = fontSize + Math.floor(img.height / 85);

  ctx.fillStyle = "white";
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

  ctx.fillStyle = "black";
  ctx.fillText(text, textX, textY);

  const newImage = canvas.toDataURL("image/jpeg");

  return newImage;
};

addTextToImage(
  "https://cdn.shopify.com/s/files/1/0883/6625/2314/files/7b01df8181c11b26960ba9695d1e0212.jpg",
  "hey"
)
  .then((res) =>
    fs.writeFileSync(
      path.join(__dirname, "edittedImage.html"),
      `<img src="${res}" />`
    )
  )
  .catch((err) => console.log(err));
