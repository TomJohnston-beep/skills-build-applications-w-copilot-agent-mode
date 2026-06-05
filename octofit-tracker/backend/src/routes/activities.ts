import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

router.post('/', async (req, res) => {
  const newActivity = await Activity.create(req.body);
  res.status(201).json(newActivity);
});

export default router;
