import express, { Request, Response } from 'express';
import ServerResponse from '../models/ServerResponse';
import AdminModel from '../models/AdminModel';
export const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const admins = await AdminModel.find();

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json(new ServerResponse('Fetch admins failed', false));
  }
});

router.post('/create', async (req: Request, res: Response) => {
  const { email, password, repeatPassword } = req.body;

  if (password !== repeatPassword)
    return res
      .status(400)
      .json(new ServerResponse("Passwords doesn't match", false));

  const emailExists = await AdminModel.countDocuments({ email: email });
  console.log(emailExists);
  if (emailExists)
    return res
      .status(409)
      .json(new ServerResponse('Email already in use', false));

  try {
    const newAdmin = await AdminModel.create({ email, password });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json(new ServerResponse('Create user failed', false));
  }
});
