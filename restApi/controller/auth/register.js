const User = require("../../models/User");
const bcrypt = require("bcrypt");

//register
const register = async (req, res) => {
  const { username, email, password } = req.body;
  //check if user is already present using emial
  //if all fields are present
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const getUser = await User.findOne({ email });
    if (getUser)
      return res.status(400).json({ message: "User already exists!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    res.status(200).json({
      message: "User created",
      user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};

module.exports = { register };
