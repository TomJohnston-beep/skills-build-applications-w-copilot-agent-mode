import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
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

router.post(
  '/',
  [
    body('position').isInt(),
    body('team').isString().notEmpty(),
    body('score').isNumeric()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newEntry = await Leaderboard.create(req.body);
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create leaderboard entry', details: error instanceof Error ? error.message : String(error) });
    }
  }
);

export default router;
