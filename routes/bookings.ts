import express, { Request, Response } from 'express';
import BookingModel from '../models/BookingModel';
import ServerResponse from '../models/ServerResponse';
import { adminCheck } from '../middlewares/adminCheck.middleware';

export const router = express.Router();

// lägg till middleware
router.post('/day', async (req: Request, res: Response) => {
  const { date } = req.body;

  try {
    const bookings = await BookingModel.find({ date: date });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json(new ServerResponse(error as string, false));
  }
});

// lägg till middleware
router.post('/month', async (req: Request, res: Response) => {
  const { monthNumber } = req.body;

  const startDate = new Date(2023, monthNumber, 1);
  const endDate = new Date(2023, monthNumber + 1, 1);

  try {
    const bookings = await BookingModel.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json(new ServerResponse(error as string, false));
  }
});

router.post('/new', async (req: Request, res: Response) => {
  const { bookingDetails } = req.body;

  try {
    const bookingCount = await BookingModel.countDocuments({
      date: new Date(bookingDetails.date),
      time: bookingDetails.time,
    });

    if (bookingCount > 0)
      return res
        .status(409)
        .json({ message: 'Booking already exists on this time.' });

    if (bookingDetails.persons > 6) {
      return res.status(409).json({ message: 'Too many persons.' });
    }

    const newBooking = await BookingModel.create({
      ...bookingDetails,
      date: new Date(bookingDetails.date),
    });

    return res.status(201).json(newBooking);
  } catch (error) {
    return res.status(500).json(new ServerResponse(error as string, false));
  }
});
