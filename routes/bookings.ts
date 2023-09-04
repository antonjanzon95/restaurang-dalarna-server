import express, { Request, Response } from 'express';
export const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  res.send('BookingsHej');
});
