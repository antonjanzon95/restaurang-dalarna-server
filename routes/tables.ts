import express, { Request, Response } from 'express';
import TableModel from '../models/TableModel';
import ServerResponse from '../models/ServerResponse';
import BookingModel from '../models/BookingModel';
export const router = express.Router();

/* /tables */
router.post('/', async (req: Request, res: Response) => {
  const { time } = req.body;
  console.log(time);

  try {
    const tables = await TableModel.find();

    for (let index = 0; index < tables.length; index++) {
      const table = tables[index];
      const bookings = await BookingModel.find({
        tableNumber: table.tableNumber,
      });

      table.isBooked = bookings.some((booking) => booking.date === time);
    }
    console.log(tables);

    res.status(200).json(tables);
  } catch (error) {
    console.log(typeof error);

    res.status(404).json(new ServerResponse(error as string, false));
  }
});
