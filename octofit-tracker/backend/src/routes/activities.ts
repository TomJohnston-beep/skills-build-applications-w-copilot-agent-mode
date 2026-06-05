import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activities', details: error instanceof Error ? error.message : String(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const newActivity = await Activity.create(req.body);
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create activity', details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
