const Estabelecimento = require("../models/Estabelecimento");

module.exports = {
  async index(req, res) {
    const estabelecimentos = await Estabelecimento.find();

    return res.json(estabelecimentos);
  },
  async store(req, res) {
    try {
      const { name, image_url, description, latitude, longitude } = req.body;

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const estabelecimento = await Estabelecimento.create({
        name,
        image_url,
        description,
        location
      });

      return res.json(estabelecimento);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  async delete(req, res) {
    const { _id } = req.params;

    await Estabelecimento.findByIdAndDelete({ _id });

    return res.json({ message: "deleted" });
  },
  async update(req, res) {
    const { _id } = req.params;

    const { name, image_url, description, latitude, longitude } = req.body;

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const estabelecimento = await Estabelecimento.findByIdAndUpdate(
      _id,
      {
        name,
        image_url,
        description,
        location
      },
      { new: true }
    );

    return res.json(estabelecimento);
  },
  async show(req, res) {
    const { _id } = req.params;
    const estabelecimento = await Estabelecimento.findById({ _id });

    return res.json(estabelecimento);
  }
};
