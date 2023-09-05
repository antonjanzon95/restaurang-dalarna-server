import express, { Request, Response, response } from 'express';
import BookingModel from '../models/BookingModel';
import ServerResponse from '../models/ServerResponse';
import TableModel from '../models/TableModel';
export const router = express.Router();

/* GET home page. */
router.get('/', async (req: Request, res: Response) => {
  try {
    const bookings = await BookingModel.find();
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json(new ServerResponse(error as string, false));
  }
});

router.post('/new', async (req: Request, res: Response) => {
  const { bookingDetails } = req.body;

  try {
    const bookingExists = await BookingModel.find({
      date: bookingDetails.date,
      time: bookingDetails.time,
    });

    if (bookingExists.length > 0)
      return res
        .status(409)
        .json({ message: 'Booking already exists on this time.' });

    const newBooking = await BookingModel.create(bookingDetails);

    return res.status(201).json(newBooking);
  } catch (error) {
    return res.status(500).json(new ServerResponse(error as string, false));
  }
});
