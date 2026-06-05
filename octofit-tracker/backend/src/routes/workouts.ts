import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const newWorkout = await Workout.create(req.body);
  res.status(201).json(newWorkout);
});

export default router;
