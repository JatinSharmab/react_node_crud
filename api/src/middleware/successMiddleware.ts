// src/middleware/responseFormatter.ts

import { Request, Response, NextFunction } from 'express';

// Response formatter middleware to standardize the response structure
const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json.bind(res); // Bind the original `json` method to preserve the context
  res.json = function (data: any) {
    res.statusCode = res.statusCode || 200;
    return oldJson({
      success: res.statusCode < 400,
      data,
    });
  } as any; // Cast as any to avoid TypeScript errors
  next();
};

export default responseFormatter;
