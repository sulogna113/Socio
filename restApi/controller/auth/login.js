const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) res.status(400).json("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) res.status(400).json("Wrong password");

    const jwttoken = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    }); // generating a JWT token with payload of the user id
    return res.status(200).json({ result: user, token: jwttoken });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { login };
