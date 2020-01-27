const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validade: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid email address" });
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//criar hash da senha e salvar no document
userSchema.pre("save", async next => {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//gerar token do user
userSchema.methods.generateAuthToken = async () => {
  const user = this;

  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

//pesquisar user por email e senha
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error({ error: "Invalid login" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
