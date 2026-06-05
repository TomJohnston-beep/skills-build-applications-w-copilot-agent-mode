import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workouts', details: error instanceof Error ? error.message : String(error) });
  }
});

router.post(
  '/',
  [
    body('name').isString().notEmpty(),
    body('durationMinutes').isNumeric(),
    body('difficulty').isString().notEmpty(),
    body('description').optional().isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newWorkout = await Workout.create(req.body);
      res.status(201).json(newWorkout);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create workout', details: error instanceof Error ? error.message : String(error) });
    }
  }
);

export default router;
