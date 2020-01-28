const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const EstabelecimentoSchema = new mongoose.Schema({
  name: String,
  image_url: String,
  description: String,
  location: {
    type: PointSchema,
    index: "2dsphere"
  }
});

module.exports = mongoose.model("Estabelecimento", EstabelecimentoSchema);
