import express, { Request, Response } from 'express';
import TableModel from '../models/TableModel';
import ServerResponse from '../models/ServerResponse';
export const router = express.Router();

/* GET home page. */
router.get('/', async (req: Request, res: Response) => {
  
  try {
    const tables = await TableModel.find();
    console.log('Sending tables');
    
    res.status(200).json(tables);
  
  } catch (error) {
    console.log(typeof error);
    
    res.status(404).json(new ServerResponse(error as string, false))
  }});
