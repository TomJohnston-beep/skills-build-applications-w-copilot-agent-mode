import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_, res) => {
  const teams = await Team.find();
  res.json(teams);
});

router.post('/', async (req, res) => {
  const newTeam = await Team.create(req.body);
  res.status(201).json(newTeam);
});

export default router;
