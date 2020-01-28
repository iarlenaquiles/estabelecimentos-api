const User = require("../models/User");

module.exports = {
  async store(req, res) {
    try {
      const user = await User.create(req.body);

      const token = await user.generateAuthToken();

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: "Ivalid user data" });
    }
  }
};
