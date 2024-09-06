import { NextFunction, Request, Response } from "express";

const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
    if (res.statusCode == 200 || res.statusCode == 201) {
      if (!res.headersSent) {
        const { data, message, statusCode } = res.locals.response || {};

        res.status(statusCode || 200).json({
          statusCode: statusCode || 200,
          message: message || "Success",
          data: data || {},
        });
      }
    }
  } catch (err: any) {
    console.error("Error in middleware:", err);

    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Internal Server Error",
    });
  }
};

export default middleware;
