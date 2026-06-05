import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ position: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load leaderboard', details: error instanceof Error ? error.message : String(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEntry = await Leaderboard.create(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create leaderboard entry', details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
