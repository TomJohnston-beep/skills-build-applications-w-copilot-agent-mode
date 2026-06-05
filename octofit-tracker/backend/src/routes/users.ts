import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

export default router;
