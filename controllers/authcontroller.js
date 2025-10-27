require("dotenv").config();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

exports.createuser = async (req, res) => {
  console.log(req.body)
  try {
    const { firstname, lastname, email, username, password, usertype } =
      req.body;
      
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      username,
      password: hashedpassword,
      usertype,
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: "user registered succefully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        usertype: user.usertype,
      },
      process.env.secretkey
    );
    const safeUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      usertype: user.usertype,
    };

    res.cookie("token", token);

    return res.status(200).json({ message: "login successful", token,user:safeUser});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.getprofile = (req, res) => {
//   console.log(req.user);
//   return res.status(200).json({ message: "success", user: req.user });
// };
// exports.loginUser = async (req, res) => {
//   console.log("hai")
//   try {

//     console.log(req.body)
//     const { email, username, password } = req.body;
//     // find by email (you may also accept username - adapt as needed)
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const ismatch = await bcrypt.compare(password, user.password);
//     if (!ismatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const payload = {
//       id: user._id,
//       username: user.username,
//       usertype: user.usertype,
//     };

//     const token = jwt.sign(payload, process.env.SECRET_KEY || "secret", {
//       expiresIn: "7d",
//     });

//     // Set cookie options
//     const cookieOptions = {
//       httpOnly: true,
//       // secure should be true in production (HTTPS)
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax", // 'lax' is a good default for typical apps
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     };

//     // Set cookie named 'token' (httpOnly)
//     res.cookie("token", token, cookieOptions);

//     // Return minimal user info (never send password)
//     const safeUser = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//       usertype: user.usertype,
//     };

//     return res.status(200).json({
//       message: "Login successful",
//       token, 
//       user: safeUser,
//     });
//   } catch (err) {
//     console.error("loginUser error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getprofile = (req, res) => {
  // auth middleware should have set req.user
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const { id, username, email, usertype } = req.user;
  return res.status(200).json({
    message: "success",
    user: { id, username, email, usertype },
  });
};

exports.admindashboard = (req, res) => {
  res.json({ message: ` welcome Admin ,${req.user.username} ` });
};

exports.commondashboard = (req, res) => {
  res.json({
    message: ` welcome User ,${req.user.username} --- i am a ${req.user.usertype}`,
  });
};
exports.studentdashboard = (req, res) => {
  res.json({
    message: ` welcome User ,${req.user.username} --- i am a ${req.user.usertype}`,
  });
};

exports.logoutuser = (req, res) => {
  res.clearCookie("token");
  console.log(res.cookie.token);
  res.status(200).json({ message: "logged out succefully" });
};
