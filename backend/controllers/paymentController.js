import userModel from "../models/userModel.js";

const paymentRewards = {
  "Credit Card": 3,
  "Gas Bill": 2,
  "UPI": 1,
  "Mobile Recharge": 2,
  "Electricity Bill": 2,
  "PayPal": 2,
  "Cryptocurrency": 4
};

class paymentController {
  async paymentHandler(req, res) {
    const reward = paymentRewards[req.body.paymentType];
    if (!reward) return res.status(400).json({ msg: "Sorry no pieces won" });

    try {
      const user = await userModel.findOne({username: req.body.username});
      if (!user) return res.status(404).json({ msg: "User not found" });

      const totalPieces = 16;
      if (user.pieces.length >= totalPieces) {
        return res.json({
          msg: "You already have all pieces!",
          pieces: user.pieces,
          rewardGiven: true,
        });
      }

      const available = [...Array(totalPieces).keys()].filter(
        (i) => !user.pieces.includes(i)
      );

      const newPieces = [];
      while (newPieces.length < reward && available.length > 0) {
        const randIndex = Math.floor(Math.random() * available.length);
        newPieces.push(available[randIndex]);
        available.splice(randIndex, 1);
      }

      user.pieces = [...new Set([...user.pieces, ...newPieces])];
      await user.save();

      const hasCompleted = user.pieces.length === totalPieces;

      res.json({
        msg: hasCompleted
          ? "You collected all pieces! Here is your reward!"
          : "Congrats! You won some pieces",
        pieces: user.pieces,
        rewardGiven: hasCompleted,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  }

  async progressHandler(req, res) {
    const { userId } = req.params;
    try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ msg: "User not found" });

      res.json({ username: user.username, pieces: user.pieces });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }

  async getLeaderboard(req, res) {
    try {
      const users = await userModel
        .find({}, "username pieces")
        .sort({ pieces: -1 });
      res.json(users);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
}

export default new paymentController();
