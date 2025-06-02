import userModel from "../models/userModel.js";

class authController {
  async loginHandler(req, res) {
    let user = await userModel.findOne({ username: req.body.username });
    if(user)
    {
      const passCheck = req.body.password === user.password
      if(passCheck)
      {
          res.json({ msg: "Login success", user: user });
      }
      else
      {
          return res.status(400).json({ msg: "Invalid credentials, Password dont match" });
      }
    }
    else
    {
      return res.status(400).json({ msg: "No user with this email" });
    }
  }

  async registerHandler(req, res) {
    let user = await userModel.findOne({ username: req.body.username });
    if(user)
    {
      return res.status(400).json({ msg: "User already exists" });
    }
    else
    {
      const newUser = new userModel({ username: req.body.username, password: req.body.password, fullName: req.body.fullname });
      console.log(newUser);
      await newUser.save();
      res.status(201).json({ msg: "User registered", user: newUser });
    }
  }
}

export default new authController();
