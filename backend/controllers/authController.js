import userModel from "../models/userModel.js";

class authController {
  async loginHandler(req, res) {
    const { username, password } = req.body;
    try {
      const user = await userModel.findOne({ username });
      console.log(user)
      if (!user || user.password !== password)
        return res.status(400).json({ msg: "Invalid credentials" });
      console.log(1)
      const { password, ...userData } = user._doc;
      res.json({ msg: "Login success", user: userData });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }

  async registerHandler(req, res) {
    const { username, password, fullname } = req.body;
    console.log(req.body);
    try {
      const existing = await userModel.findOne({ username });
      if (existing) return res.status(400).json({ msg: "Username taken" });
      console.log(2);
      const user = new userModel({ username, password, fullName: fullname });
      console.log(user);
      await user.save();
      console.log("saved");
      const { password, ...userData } = user._doc;
      res.status(201).json({ msg: "User registered", user: userData });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
}

export default new authController();
