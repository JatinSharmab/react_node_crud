import express, { Application, Request, Response, NextFunction } from 'express';

// Custom error class for handling method errors
class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'CustomError';
        this.status = status;   
    }
}

// Middleware to check request method
const checkMethod = (allowedMethods: string[]) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!allowedMethods.includes(req.method)) {
        const error = new CustomError(`Invalid method: ${req.method}`, 405); 
        return next(error); // Pass the error to the next middleware or error handler
    }
    next(); // Call next if the method is valid
};

// Error handling middleware
const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
};

export default checkMethod;
export { CustomError, errorHandler };
