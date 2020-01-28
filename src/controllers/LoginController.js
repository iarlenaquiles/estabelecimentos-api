const User = require("../models/User");

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findByCredentials(email, password);

      if (!user) {
        return res.status(400).json({ error: "Login failed" });
      }

      const token = await user.generateAuthToken();

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};
