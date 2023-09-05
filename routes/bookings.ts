import express, { Request, Response, response } from 'express';
import BookingModel from '../models/BookingModel';
import ServerResponse from '../models/ServerResponse';
export const router = express.Router();

/* GET home page. */
router.get('/', async (req: Request, res: Response) => {
  try {
    const bookings = await BookingModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(new ServerResponse(error as string, false))
  }
});
