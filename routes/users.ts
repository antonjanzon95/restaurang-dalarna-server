import express, { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import ServerResponse from '../models/ServerResponse';
import AdminModel from '../models/AdminModel';
var router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(new ServerResponse('Fetch users failed', false));
  }
});

router.post('/create', async (req: Request, res: Response) => {
  const { email, password, repeatPassword } = req.body;

  console.log(req.body);

  if (password !== repeatPassword)
    return res
      .status(400)
      .json(new ServerResponse("Passwords doesn't match", false));

  const emailExists = await UserModel.countDocuments({ email: email });
  console.log(emailExists);
  if (emailExists)
    return res
      .status(409)
      .json(new ServerResponse('Email already in use', false));

  try {
    const newUser = await UserModel.create({ email, password });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(new ServerResponse('Create user failed', false));
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email, password });
    const admin = await AdminModel.find({ email, password });

    if (!user.length && !admin.length)
      return res
        .status(409)
        .json(new ServerResponse('Wrong email or password', false));

    res.status(200).json(user.length ? user[0] : admin[0]);
  } catch (error) {
    res.status(500).json(new ServerResponse('Login user failed', false));
  }
});

module.exports = router;
