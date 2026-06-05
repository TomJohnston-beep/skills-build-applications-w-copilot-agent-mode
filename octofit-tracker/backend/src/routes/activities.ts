import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
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

router.post(
  '/',
  [
    body('type').isString().notEmpty(),
    body('durationMinutes').isNumeric(),
    body('calories').isNumeric(),
    body('userId').isString().notEmpty(),
    body('performedAt').optional().isISO8601()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newActivity = await Activity.create(req.body);
      res.status(201).json(newActivity);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create activity', details: error instanceof Error ? error.message : String(error) });
    }
  }
);

export default router;
