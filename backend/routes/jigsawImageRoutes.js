import express from 'express';
import JigsawImageController from '../controllers/jigsawImageController.js';

const router = express.Router();

router.post('/generateAndGet', JigsawImageController.generateAndGetImage);

export default router;