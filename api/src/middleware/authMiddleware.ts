import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
dotenv.config();

interface RequestId extends Request {
  userId?: string;
}

const authenticateToken = (req: RequestId, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401).send("===============e================");

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user: any) => {
    if (err) return res.sendStatus(403);
    req.userId = user.userId; 
    next();
  });
};

export default authenticateToken;
