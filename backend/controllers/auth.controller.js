import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    let { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password don't macth" });
    }

    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hashing Password

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/
    let boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    let girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    let newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // generate jwt token here
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      // status code 201 means :- created successfully.
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(501).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    let isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Username or Password" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(501).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(501).json({ error: "Internal Server Error" });
  }
};
