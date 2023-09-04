import express, { Request, Response } from 'express';
export const router = express.Router();

/* GET home page. */
router.get('/', async (req: Request, res: Response) => {
  res.send('BookingsHej');
});
