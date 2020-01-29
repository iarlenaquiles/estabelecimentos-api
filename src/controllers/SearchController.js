const Estabelecimento = require("../models/Estabelecimento");

module.exports = {
  //buscar estabelecimentos em um raio
  async index(req, res) {
    const { latitude, longitude, distance } = req.query;

    const estabelecimentos = await Estabelecimento.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: distance
        }
      }
    });

    return res.json(estabelecimentos);
  }
};
