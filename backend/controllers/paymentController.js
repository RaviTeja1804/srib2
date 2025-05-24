import userModel from "../models/userModel.js";

const paymentRewards = {
  credit_card: 3,
  gas_bill: 2,
  upi: 1,
  mobile_recharge: 2,
  electricity_bill: 2,
};

class paymentController {
  async paymentHandler(req, res) {
    const { userId, paymentType } = req.body;

    const reward = paymentRewards[paymentType];
    if (!reward) return res.status(400).json({ msg: "Sorry no pieces won" });

    try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ msg: "User not found" });

      const totalPieces = 16;

      const available = [...Array(totalPieces).keys()].filter(
        (i) => !user.pieces.includes(i)
      );
      const newPieces = [];

      while (newPieces.length < reward && available.length > 0) {
        const randIndex = Math.floor(Math.random() * available.length);
        newPieces.push(available[randIndex]);
        available.splice(randIndex, 1);
      }

      user.pieces.push(...newPieces);
      await user.save();

      const uniquePieces = [...new Set(user.pieces)];
      const hasCompleted = uniquePieces.length === totalPieces;

      res.json({
        msg: hasCompleted
          ? "You collected all pieces! Here is your reward!"
          : "Congrats! You won some pieces",
        pieces: uniquePieces,
        rewardGiven: hasCompleted,
      });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }

  async progressHandler(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ msg: "User not found" });

      res.json({ username: user.username, pieces: user.pieces });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }

  async getLeaderboard(req, res) {
    try {
      const users = await userModel.find({}, "username pieces").sort({ pieces: -1 });
      res.json(users);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
}

export default new paymentController();