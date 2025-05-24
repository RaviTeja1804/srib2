import express from "express";
import paymentController from "../controllers/paymentController.js"

const router = express.Router();

router.post('/pay', paymentController.paymentHandler);
router.get('/progress/:userId', paymentController.progressHandler);
router.get('/leaderboard', paymentController.getLeaderboard);

export default router;