import { NextFunction, Request, Response } from 'express';

export const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  const { isAdmin } = req.headers;

  if (isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized.' });
  }
};
