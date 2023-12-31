import express, { Request, Response } from 'express';
import BookingModel from '../models/BookingModel';
import ServerResponse from '../models/ServerResponse';
import { IBooking } from '../models/IBooking';

export const router = express.Router();

router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const userBookings = await BookingModel.find({ userId: userId });

    res.status(200).json(userBookings);
  } catch (error) {
    res.status(500).json(new ServerResponse('Failed to fetch bookings', false));
  }
});

// lägg till middleware
router.post('/day', async (req: Request, res: Response) => {
  const { date } = req.body;

  const startOfDay = new Date(date).setHours(0, 0, 0, 0);
  const endOfDay = new Date(date).setHours(23, 59, 59);

  try {
    const bookings = await BookingModel.find({
      time: { $gte: startOfDay, $lt: endOfDay },
    });

    console.log(bookings);

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
      time: {
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
    console.log(error);

    return res.status(500).json(new ServerResponse(error as string, false));
  }
});

router.delete('/delete/:bookingId', async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;

  try {
    const booking = await BookingModel.findByIdAndDelete(bookingId);

    if (!booking)
      return res.status(404).json({ message: 'Booking not found.' });

    return res.status(200).json({ deletedId: bookingId });
  } catch (error) {
    return res.status(500).json(new ServerResponse(error as string, false));
  }
});

router.put('/update', async (req, res) => {
  console.log('req.body: ', req.body);
  const {
    _id,
    email,
    firstName,
    lastName,
    persons,
    tableNumber,
    time,
  }: IBooking = req.body;

  const updatedBooking = await BookingModel.findByIdAndUpdate(
    _id,
    {
      email,
      firstName,
      lastName,
      persons,
      tableNumber,
      time,
    },
    { new: true }
  );

  console.log(updatedBooking);

  res
    .status(200)
    .json(
      new ServerResponse('Updated booking successfully', true, updatedBooking)
    );
});
