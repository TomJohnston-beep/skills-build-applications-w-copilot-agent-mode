import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_, res) => {
  const leaderboard = await Leaderboard.find().sort({ position: 1 });
  res.json(leaderboard);
});

router.post('/', async (req, res) => {
  const newEntry = await Leaderboard.create(req.body);
  res.status(201).json(newEntry);
});

export default router;
