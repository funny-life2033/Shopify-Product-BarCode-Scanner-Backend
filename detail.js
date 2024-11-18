const axios = require("axios");

axios.default
  .get("https://api.discogs.com/database/search?barcode=7464392254", {
    headers: {
      Authorization: "Discogs token=pIUgOwAVYaLydABFdNSlcdTTXMeTaANmztAhdmOm",
    },
  })
  .then((res) => {
    console.log(JSON.stringify(res.data, null, 2));
  })
  .catch((err) => console.log("error: ", err));
