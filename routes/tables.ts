import express, { Request, Response } from 'express';
import TableModel from '../models/TableModel';
import ServerResponse from '../models/ServerResponse';
import BookingModel from '../models/BookingModel';
export const router = express.Router();

/* /tables */
router.post('/', async (req: Request, res: Response) => {
  console.log('----------');
  
  const { time } = req.body;
  console.log('Time: ', time);

  try {
    const tables = await TableModel.find();
    const bookings = await BookingModel.find({ time });

    console.log('Bookings:', bookings, 'Time from body: ', time);

    for (let index = 0; index < tables.length; index++) {
      const table = tables[index];
      const foundBookings = bookings.filter(
        (booking) => booking.tableNumber === table.tableNumber
      );

      table.isBooked = foundBookings.length > 0;
    }

    res.status(200).json(tables);
  } catch (error) {
    console.log(typeof error);

    res.status(404).json(new ServerResponse(error as string, false));
  }
});
