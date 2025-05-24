import express from "express";
import paymentController from "../controllers/paymentController.js"

const router = express.Router();

router.post('/pay', paymentController.makePayment);
router.get('/progress/:userId', paymentController.getUserProgress);
router.get('/leaderboard', paymentController.getLeaderboard);

export default router;